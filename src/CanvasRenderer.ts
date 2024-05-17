export default class CanvasRenderer {
  canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    this.context = canvas.getContext("2d")!;
    this.canvas = canvas;

    return this;
  }

  drawDirections() {
    const ctx = this.context;
    const centerX = 10;
    const centerY = this.canvas.height - 10;
    const horLineLength = this.canvas.width - 15;
    const vertLineLength = this.canvas.height - 15;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    this.drawArrow(centerX, centerY, centerX, centerY - vertLineLength);
    this.drawArrow(centerX, centerY, centerX + horLineLength, centerY);
  }

  private drawArrow(fromX: number, fromY: number, toX: number, toY: number) {
    const ctx = this.context;
    const headLength = 10; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    this.drawLine(fromX, fromY, toX, toY);

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6),
    );
    ctx.lineTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawLine(fromX: number, fromY: number, toX: number, toY: number) {
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }

  drawGrid(cellSize: number) {
    const ctx = this.context;
    const width = this.canvas.width;
    const height = this.canvas.height;

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += cellSize) {
      this.drawLine(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += cellSize) {
      this.drawLine(0, y, width, y);
    }
  }

  drawBar(x: number, y: number, width: number, height: number, color: string) {
    const ctx = this.context;
    ctx.fillStyle = color;
    ctx.fillRect(x, y - height, width, height);
  }
}
