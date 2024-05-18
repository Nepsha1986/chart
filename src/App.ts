import DataService from "./DataService.ts";
import DataDrawer from "./DataDrawer.ts";

interface ElProps {
  src: string;
}

type ObservedAttr = keyof ElProps;

export class Chart extends HTMLElement {
  #service: DataService;
  #drawer: DataDrawer | null = null;
  #zoom: number;
  static observedAttributes: ObservedAttr[] = ["src"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#service = new DataService(this.src);
    this.#zoom = 1;

    this._onWheel = this._onWheel.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
  }

  _onMouseOver() {
    this.addEventListener("wheel", this._onWheel);
  }

  _onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY * 0.001;
    this.zoom = this.zoom + delta;
    this.drawer.render(this.zoom);
  }

  set zoom(delta: number) {
    this.#zoom = delta;
  }

  get zoom() {
    return this.#zoom;
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
    this.addEventListener("mouseover", this._onMouseOver);
    const data = await this.#getData();
    this.drawer = new DataDrawer(data[0].Bars);
    this.drawer.init();
    this.drawer.render();
    this.#mountEl();
  }

  async #getData() {
    try {
      return await this.#service.get();
    } catch (e) {
      throw new Error("Error while getting data");
    }
  }

  #mountEl(): void {
    if (this.shadowRoot && this.#drawer) {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.#drawer.canvas);
    }
  }
}
