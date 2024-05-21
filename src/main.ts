import { Chart } from "./App.ts";
import "./style.css";

customElements.define("canvas-chart", Chart);

const dataSrc1 =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

const dataSrc2 =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=USDJPY&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
	<h1>Use cases</h1>
	<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px">
		<canvas-chart config='{"errorMessage":"red"}' src=${dataSrc1}></canvas-chart>
  	<canvas-chart src=${dataSrc2}></canvas-chart>
  
		<canvas-chart config='{"errorMessage":"I can add any error message here wery easily!"}' src='/dummy-src'></canvas-chart>
		<canvas-chart src='/dummy-src'></canvas-chart>
	</div>
`;
