import CanvasRenderer from "./CanvasRenderer.ts";
import { DataResDto } from "./DataService.ts";

export default class DataDrawer {
  canvas: HTMLCanvasElement;
  #renderer: CanvasRenderer;
  constructor() {
    this.#renderer = new CanvasRenderer(
      window.innerWidth - 100,
      window.innerWidth / 2,
    );
    this.canvas = this.#renderer.canvas;
  }

  init() {
    this.#renderer.drawGrid(20);
    this.#renderer.drawDirections();
  }

  render(data: DataResDto) {
    data[0].Bars.forEach((i) => {
      this.#renderer.drawBar(i.Time, i.Time + 10, 10, i.Low, "#da2626");
    });
  }
}
