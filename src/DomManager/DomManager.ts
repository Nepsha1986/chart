import DataDrawer from "../DataDrawer/DataDrawer.ts";

export class DomManager {
  private root: ShadowRoot;

  constructor(shadowRoot: ShadowRoot) {
    this.root = shadowRoot;

    this.#mountChartContainer();
  }

  #mountChartContainer(): void {
    this.root.innerHTML = "";
    const style = document.createElement("style");
    style.textContent = `
      .chart-container {
        max-width: 1200px;
        background: #fdfdfd;
        position: relative;
      }
    `;

    const container = document.createElement("div");
    container.classList.add("chart-container");

    this.root.append(style, container);
  }

  mountChart(drawer: DataDrawer): void {
    const container = this.root.querySelector(".chart-container");
    if (!container) throw new Error("Cannot mount component");

    const style = document.createElement("style");
    style.textContent = `
      canvas {
        width: 100%;
        border: 1px solid #ccc;
      }
    `;

    container.appendChild(drawer.canvas);
    this.root.append(style, container);
  }

  mountSpinner(): void {
    const container = this.root.querySelector(".chart-container");
    if (!container) throw new Error("Cannot mount Spinner component");

    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.innerHTML = `Loading, please wait...`;

    container.appendChild(spinner);
  }

  unmountSpinner(): void {
    const spinner = this.root.querySelector(".spinner");
    if (spinner) {
      spinner.remove();
    }
  }

  mountError(): void {
    const container = this.root.querySelector(".chart-container");
    if (!container) throw new Error("Cannot mount Error component");

    const errorBlock = document.createElement("div");
    errorBlock.classList.add("error-block");
    errorBlock.innerHTML = `Error, please try again later`;

    container.appendChild(errorBlock);
  }
}
