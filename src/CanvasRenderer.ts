export default class CanvasRenderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    this.context = canvas.getContext("2d")!;
    this.canvas = canvas;

    return this;
  }
}
