export default class CanvasRenderer {
  canvas: HTMLCanvasElement;
  readonly #context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    this.#context = canvas.getContext("2d")!;
    this.canvas = canvas;

    return this;
  }

  #changeOrigin() {
    this.#context.translate(0, this.canvas.height);
    this.#context.scale(1, -1);
  }

  clear() {
    const ctx = this.#context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawLine(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string = "#f1f1f1",
    type: "dashed" | "solid" = "solid",
  ) {
    const ctx = this.#context;
    this.#changeOrigin();
    if (type === "dashed") ctx.setLineDash([10, 3]);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.setLineDash([]);
    this.#changeOrigin();
  }

  drawBar(x: number, y: number, width: number, height: number, color: string) {
    const ctx = this.#context;
    this.#changeOrigin();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    this.#changeOrigin();
  }

  drawText(
    text: string,
    xPos: number,
    yPos: number,
    color: string = "#3b3b3b",
  ) {
    const ctx = this.#context;
    ctx.font = "normal 16px sans-serif";
    ctx.fillStyle = color;

    ctx.fillText(text, xPos, yPos);
  }
}
