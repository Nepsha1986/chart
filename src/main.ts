import "./style.css";
import { App } from "./App.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  `<div id="counter" />`;

App(document.querySelector<HTMLButtonElement>("#counter")!);
