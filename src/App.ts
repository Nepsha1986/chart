import DataService from "./DataService.ts";
import CanvasRenderer from "./CanvasRenderer.ts";

interface ElProps {
  src: string;
  width: string;
  height: string;
}

type ObservedAttr = keyof ElProps;

export class Chart<T> extends HTMLElement {
  private service: DataService<T>;
  private canvasRenderer: CanvasRenderer;
  private data: T[];
  static observedAttributes: ObservedAttr[] = ["src", "width", "height"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.service = new DataService<T>(this.src);
    this.canvasRenderer = new CanvasRenderer(
      parseInt(this.width),
      parseInt(this.height),
    );

    this.render();
  }

  get src(): string {
    return this.getAttribute("src") || "";
  }

  get width(): string {
    return this.getAttribute("width") || "";
  }

  get height(): string {
    return this.getAttribute("height") || "";
  }

  async connectedCallback() {
    this.canvasRenderer.context.fillText("Loading, please wait...", 20, 20);
    this.data = await this.getData();
    this.canvasRenderer.context.clearRect(
      0,
      0,
      parseInt(this.width),
      parseInt(this.height),
    );
  }
  //
  private async getData() {
    try {
      return await this.service.get();
    } catch (e) {
      throw new Error("Error while getting data");
    }
  }

  private render(): void {
    this.shadowRoot?.appendChild(this.canvasRenderer.canvas);
  }
}
