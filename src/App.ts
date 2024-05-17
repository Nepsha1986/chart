import DataService from "./DataService.ts";
import DataDrawer from "./DataDrawer.ts";

interface ElProps {
  src: string;
  width: string;
  height: string;
}

type ObservedAttr = keyof ElProps;

export class Chart extends HTMLElement {
  private service: DataService;
  private drawer: DataDrawer;
  static observedAttributes: ObservedAttr[] = ["src", "width", "height"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.service = new DataService(this.src);
    this.drawer = new DataDrawer();

    this.render();
  }

  get src(): string {
    return this.getAttribute("src") || "";
  }

  async connectedCallback() {
    const data = await this.getData();
    this.drawer.init();
    this.drawer.render(data);
  }

  private async getData() {
    try {
      return await this.service.get();
    } catch (e) {
      throw new Error("Error while getting data");
    }
  }

  private render(): void {
    this.shadowRoot?.appendChild(this.drawer.canvas);
  }
}
