import DataDrawer from "../DataDrawer/DataDrawer.ts";

interface Styles {
  [key: string]: string;
}

const classNames = {
  chartContainer: "chart-container",
  spinner: "spinner",
  errorBlock: "error-block",
  canvas: "chart-canvas",
};

const styles: Styles = {
  chartContainer: `
    .${classNames.chartContainer} {
      max-width: 1200px;
      background: #fdfdfd;
      position: relative;
    }
  `,
  canvas: `
    .${classNames.canvas} {
      width: 100%;
      border: 1px solid #ccc;
    }
  `,
  spinner: `
    .${classNames.spinner} {
      text-align: center;
      padding: 1rem;
    }
  `,
  errorBlock: `
    .${classNames.errorBlock} {
      max-width: 100%;
      color: red;
      text-align: center;
      padding: 1rem;
      border: 1px solid red;
    }
  `,
};

export class DomManager {
  private root: ShadowRoot;

  constructor(shadowRoot: ShadowRoot) {
    this.root = shadowRoot;
    this.#mountStyle(styles.chartContainer);
    this.#mountChartContainer();
  }

  #mountChartContainer(): void {
    this.root.innerHTML = "";
    const container = document.createElement("div");
    container.classList.add(classNames.chartContainer);
    this.root.appendChild(container);
  }

  mountChart(drawer: DataDrawer): void {
    const container = this.root.querySelector(`.${classNames.chartContainer}`);
    if (!container) throw new Error("Cannot mount component");

    this.#mountStyle(styles.canvas);
    drawer.canvas.classList.add(classNames.canvas);
    container.appendChild(drawer.canvas);
  }

  mountSpinner(): void {
    const container = this.root.querySelector(`.${classNames.chartContainer}`);
    if (!container) throw new Error("Cannot mount Spinner component");

    this.#mountStyle(styles.spinner);
    const spinner = document.createElement("div");
    spinner.classList.add(classNames.spinner);
    spinner.innerHTML = `Loading, please wait...`;
    container.appendChild(spinner);
  }

  unmountSpinner(): void {
    const spinner = this.root.querySelector(`.${classNames.spinner}`);
    if (spinner) {
      spinner.remove();
    }
  }

  mountError(message: string = "Error, please try again later"): void {
    const container = this.root.querySelector(`.${classNames.chartContainer}`);
    if (!container) throw new Error("Cannot mount Error component");

    this.#mountStyle(styles.errorBlock);
    const errorBlock = document.createElement("div");
    errorBlock.classList.add(classNames.errorBlock);
    errorBlock.innerHTML = message;
    container.appendChild(errorBlock);
  }

  #mountStyle(styleContent: string): void {
    const style = document.createElement("style");
    style.textContent = styleContent;
    this.root.appendChild(style);
  }
}
