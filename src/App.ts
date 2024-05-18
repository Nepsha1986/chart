import DataService from "./DataService.ts";
import DataDrawer from "./DataDrawer.ts";

interface ElProps {
  src: string;
}

type ObservedAttr = keyof ElProps;

export class Chart extends HTMLElement {
  #service: DataService;
  #drawer: DataDrawer | null = null;
  static observedAttributes: ObservedAttr[] = ["src"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#service = new DataService(this.src);
  }

  set drawer(drawer: DataDrawer) {
    this.#drawer = drawer;
  }

  get drawer(): DataDrawer {
    if (this.#drawer === null) {
      throw new Error("Drawer is not set");
    }
    return this.#drawer;
  }

  get src(): string {
    return this.getAttribute("src") || "";
  }

  async connectedCallback() {
    const data = await this.#getData();
    this.drawer = new DataDrawer(data[0].Bars);
    this.drawer.init();
    this.drawer.render();
    this.#render();
  }

  async #getData() {
    try {
      return await this.#service.get();
    } catch (e) {
      throw new Error("Error while getting data");
    }
  }

  #render(): void {
    if (this.shadowRoot && this.#drawer) {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.#drawer.canvas);
    }
  }
}
