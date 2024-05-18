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
  readonly #data: BarData[];

  constructor(data: BarData[]) {
    this.#renderer = new CanvasRenderer(
      window.innerWidth - 20,
      window.innerWidth / 2,
    );

    this.#data = data;
    this.canvas = this.#renderer.canvas;
  }

  init() {
    this.#renderer.drawGrid(20);
    this.#renderer.drawDirections();
  }

  render(zoom: number = 1, start: number = 0) {
    const startRatio = start;
    const endRatio = 1 - start;
    const percentage = (zoom - 1) * 100;

    const startIndex = percentage * this.#data.length * startRatio;
    const endIndex =
      this.#data.length - this.#data.length * percentage * endRatio;

    this.#renderer.clear();
    this.init();
    const data =
      zoom <= 1 ? this.#data : this.#data.slice(startIndex, endIndex);

    const barsLength = data.length;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const xRatio = canvasWidth / (barsLength * 60);

    const [minY, maxY] = getLowHigh(data);
    const [minX, _] = getMinMax(data);

    const yRatio = canvasHeight / (maxY - minY);

    data.forEach((i) => {
      const color = i.Open > i.Close ? "#ff4846" : "#00b896";

      this.#renderer.drawLine(
        (i.Time - minX + 30) * xRatio,
        (i.Open - minY) * yRatio,
        (i.Time - minX + 30) * xRatio,
        (i.Close - minY) * yRatio,
        color,
      );
      this.#renderer.drawBar(
        (i.Time - minX) * xRatio,
        (i.Low - minY) * yRatio,
        60 * xRatio,
        (i.High - i.Low) * yRatio,
        color,
      );
    });
  }
}
