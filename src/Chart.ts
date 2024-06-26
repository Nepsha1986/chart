import DataService from "./DataService/DataService.ts";
import DataDrawer from "./DataDrawer/DataDrawer.ts";
import { DomManager } from "./DomManager/DomManager.ts";

interface ElProps {
  src: string;
  config: ComponentConfig;
}

type ComponentConfig = {
  errorMessage: string;
};

type ObservedAttr = keyof ElProps;

export class Chart extends HTMLElement {
  #service: DataService;
  #drawer: DataDrawer | null = null;
  #domManager: DomManager;
  config?: ComponentConfig;
  // TODO: Research how to implement auto-update
  static observedAttributes: ObservedAttr[] = ["src"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#service = new DataService(this.src);
    this.#domManager = new DomManager(this.shadowRoot!);
  }

  get src(): string {
    return this.getAttribute("src") || "";
  }

  async connectedCallback() {
    const dataConfig = this.getAttribute("config");

    if (dataConfig) {
      this.config = JSON.parse(dataConfig);
    }

    try {
      this.#domManager.mountSpinner();
      const data = await this.#getData();
      this.#drawer = new DataDrawer(data[0]);
      this.#drawer.renderData();
      this.#domManager.mountChart(this.#drawer);
    } catch (e) {
      this.#domManager.mountError(this.config?.errorMessage);
    } finally {
      this.#domManager.unmountSpinner();
    }
  }

  async #getData() {
    try {
      return await this.#service.get();
    } catch (e) {
      throw new Error("Error while getting data");
    }
  }
}
