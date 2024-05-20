import CanvasRenderer from "../CanvasRenderer/CanvasRenderer.ts";
import { BarData } from "../DataService/DataService.ts";
import { formatDate, getLowHigh, getMinMax } from "./_utils";

export default class DataDrawer {
  canvas: HTMLCanvasElement;
  #renderer: CanvasRenderer;
  readonly #datesSegments: number = 4;
  #firstIndexInView: number = 0;
  #lastIndexInView: number;
  #zoom: number;
  #mouseX: number;
  #startPos: number = 0;
  readonly #data: BarData[];

  constructor(data: BarData[]) {
    this.#renderer = new CanvasRenderer(1200, 600);
    this.#lastIndexInView = data.length - 1;
    this.#zoom = 1;
    this.#mouseX = 0;
    this.#data = data;
    this.canvas = this.#renderer.canvas;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onWheel = this._onWheel.bind(this);

    this.canvas.addEventListener("mousedown", this._onMouseDown);
    this.canvas.addEventListener("wheel", this._onWheel);
  }

  private _onMouseDown(e: MouseEvent) {
    document.body.style.cursor = "grab";
    this.#startPos = e.offsetX;
    this.canvas.addEventListener("mousemove", this._onMouseMove);
    this.canvas.addEventListener("mouseup", this._onMouseUp);
  }

  private _onMouseMove(e: MouseEvent) {
    this.scroll(this.#startPos - e.offsetX);
  }

  private _onMouseUp() {
    document.body.style.cursor = "default";
    this.canvas.removeEventListener("mousemove", this._onMouseMove);
    this.canvas.removeEventListener("mouseup", this._onMouseUp);
  }

  private _onWheel(event: WheelEvent) {
    event.preventDefault();
    this.#mouseX = event.clientX;

    const delta = event.deltaY * 0.000001;
    if (
      (this.visibleData.length < 20 && event.deltaY > 0) ||
      (this.isAllInView && event.deltaY < 0)
    )
      return;
    this.#zoom = this.#zoom + delta;
    this.zoom(this.#zoom, this.#mouseX / this.canvas.width);
  }

  #init(): void {
    this.#renderer.clear();
    //this.#renderer.drawGrid(20);
    //this.#renderer.drawDirections();
  }

  get visibleData(): BarData[] {
    return this.#data.slice(this.#firstIndexInView, this.#lastIndexInView);
  }

  get isAllInView(): boolean {
    return this.#data.length === this.visibleData.length;
  }

  scroll(val: number): void {
    this.#firstIndexInView = Math.max(
      0,
      this.#firstIndexInView + Math.floor(val * 0.01),
    );
    this.#lastIndexInView = Math.min(
      this.#data.length,
      this.#lastIndexInView + Math.floor(val * 0.01),
    );

    this.renderData();
  }

  zoom(zoom: number = 1, mousePos: number = 0): void {
    const startRatio = mousePos;
    const endRatio = 1 - mousePos;
    const percentage = (zoom - 1) * 100;

    this.#firstIndexInView = Math.max(
      0,
      percentage * this.#data.length * startRatio,
    );
    this.#lastIndexInView = Math.min(
      this.#data.length,
      this.#data.length - this.#data.length * percentage * endRatio,
    );

    this.renderData();
  }

  #renderDates(): void {
    const step = Math.floor(this.visibleData.length / this.#datesSegments);
    let dates: number[] = [];

    for (let i = 0; i <= this.#datesSegments; i++) {
      const index = Math.min(i * step, this.visibleData.length - 1);
      dates.push(this.visibleData[index].Time);
    }

    dates.forEach((time, index) => {
      let xPos;

      if (this.visibleData.length < 50) {
        xPos = (time - this.visibleData[0].Time) * this.#xRatio;
      } else {
        xPos = (this.canvas.width / this.#datesSegments) * index;
      }

      this.#renderer.drawLine(
        xPos,
        0,
        xPos,
        this.canvas.height,
        "#9f9f9f",
        "dashed",
      );
      this.#renderer.drawText(formatDate(time), xPos + 10, -15);
    });
  }

  get #xRatio(): number {
    const canvasWidth = this.canvas.width;
    const barsLength = this.visibleData.length;
    return canvasWidth / (barsLength * 60);
  }

  renderData(): void {
    this.#init();

    const canvasHeight = this.canvas.height;
    const xRatio = this.#xRatio;

    const [minY, maxY] = getLowHigh(this.visibleData);
    const [minX, _] = getMinMax(this.visibleData);

    const yRatio = canvasHeight / (maxY - minY);

    this.visibleData.forEach((i) => {
      const color = i.Open > i.Close ? "#ff4846" : "#00b896";

      this.#renderer.drawLine(
        (i.Time - minX + 30) * xRatio,
        (i.Low - minY) * yRatio,
        (i.Time - minX + 30) * xRatio,
        (i.High - minY) * yRatio,
        color,
      );
      this.#renderer.drawBar(
        (i.Time - minX) * xRatio,
        (i.Open - minY) * yRatio,
        60 * xRatio,
        (i.Close - i.Open) * yRatio,
        color,
      );
    });

    this.#renderDates();
  }
}
