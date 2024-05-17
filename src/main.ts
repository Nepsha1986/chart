import "./style.css";
import { Chart } from "./App.ts";

customElements.define("canvas-chart", Chart);

const dataSrc =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=USDJPY&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  `<canvas-chart src=${dataSrc} />`;
