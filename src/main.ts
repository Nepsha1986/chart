import { Chart } from "./Chart.ts";
import "./style.css";

customElements.define("canvas-chart", Chart);

const dataSrc1 =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

const dataSrc2 =
  "https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=USDJPY&Timeframe=1&Start=57674&End=59113&UseMessagePack=false";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
	<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px">
		<canvas-chart src=${dataSrc1}></canvas-chart>
  	<canvas-chart src=${dataSrc2}></canvas-chart>
  
		<canvas-chart src='/dummy-src'></canvas-chart>
		<canvas-chart config='{"errorMessage":"I can add any error message here wery easily if fetchin data fails!"}' src='/dummy-src'></canvas-chart>
	</div>
	
	<p>Please read README.MD for an explanation</p>
`;
