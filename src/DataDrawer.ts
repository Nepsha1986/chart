import CanvasRenderer from "./CanvasRenderer.ts";
import { BarData } from "./DataService.ts";

const getLowHigh = (bars: BarData[]): [number, number] =>
  bars.reduce(
    ([lowestLow, highestHigh], bar) => [
      Math.min(lowestLow, bar.Low),
      Math.max(highestHigh, bar.High),
    ],
    [bars[0].Low, bars[0].High],
  );

const getMinMax = (bars: BarData[]): [number, number] => {
  return [bars[0].Time, bars[bars.length - 1].Time];
};

export default class DataDrawer {
  canvas: HTMLCanvasElement;
  #renderer: CanvasRenderer;
  #firstIndexInView: number = 0;
  #lastIndexInView: number;
  #dataInView: BarData[];
  #zoom: number;
  #mouseX: number;
  readonly #data: BarData[];

  constructor(data: BarData[]) {
    this.#renderer = new CanvasRenderer(
      window.innerWidth - 20,
      window.innerWidth / 2,
    );
    this.#lastIndexInView = data.length - 1;
    this.#zoom = 1;
    this.#mouseX = 0;
    this.#data = data;
    this.#dataInView = data;
    this.canvas = this.#renderer.canvas;
    this.canvas.addEventListener("mouseover", this._onMouseOver.bind(this));

    this._onWheel = this._onWheel.bind(this);
    this._onMove = this._onMove.bind(this);
  }

  _onMove(event: MouseEvent) {
    this.#mouseX = event.clientX;
  }

  _onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY * 0.000001;
    if (
      (this.visibleData.length < 20 && event.deltaY > 0) ||
      (this.isAllInView && event.deltaY < 0)
    )
      return;
    this.#zoom = this.#zoom + delta;
    this.zoom(this.#zoom, this.#mouseX / this.canvas.width);
  }

  private _onMouseOver() {
    let startPos = 0;

    const onMouseMove = (e: MouseEvent) => {
      this.scroll(startPos - e.offsetX);
    };

    const onMouseDown = (e: MouseEvent) => {
      startPos = e.offsetX;
      this.canvas.addEventListener("mousemove", onMouseMove);
      const onMouseUp = () => {
        this.canvas.removeEventListener("mousemove", onMouseMove);
        this.canvas.removeEventListener("mouseup", onMouseUp);
      };
      this.canvas.addEventListener("mouseup", onMouseUp);
    };

    this.canvas.addEventListener("mousedown", onMouseDown);
    this.canvas.addEventListener("wheel", this._onWheel);
  }

  init() {
    this.#renderer.drawGrid(20);
    this.#renderer.drawDirections();
  }

  set visibleData(bars: BarData[]) {
    this.#dataInView = bars;
  }

  get visibleData() {
    return this.#dataInView;
  }

  get isAllInView() {
    return this.#data.length === this.visibleData.length;
  }

  scroll(val: number) {
    this.#firstIndexInView = this.#firstIndexInView + Math.floor(val * 0.01);
    this.#lastIndexInView = this.#lastIndexInView + Math.floor(val * 0.01);

    this.render(this.#firstIndexInView, this.#lastIndexInView);
  }

  zoom(zoom: number = 1, start: number = 0) {
    const startRatio = start;
    const endRatio = 1 - start;
    const percentage = (zoom - 1) * 100;

    this.#firstIndexInView = percentage * this.#data.length * startRatio;
    this.#lastIndexInView =
      this.#data.length - this.#data.length * percentage * endRatio;

    this.render(this.#firstIndexInView, this.#lastIndexInView);
  }

  render(startIndex: number = 0, endIndex: number = this.#data.length - 1) {
    this.visibleData = this.#data.slice(startIndex, endIndex);

    this.#renderer.clear();
    this.init();

    const barsLength = this.visibleData.length;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const xRatio = canvasWidth / (barsLength * 60);

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
  }
}
