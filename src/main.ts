import { Chart } from "./App.ts";
import "./style.css";

customElements.define("canvas-chart", Chart);

const dataSrc1 =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

const dataSrc2 =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=USDJPY&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  `<div style="display: flex; gap: 10px">
		<canvas-chart src=${dataSrc1}></canvas-chart>
  	<canvas-chart src=${dataSrc2}></canvas-chart>
	</div>
`;
