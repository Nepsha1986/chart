import { BarData } from "../../DataService/DataService.ts";

export const getLowHigh = (bars: BarData[]): [number, number] =>
  bars.reduce(
    ([lowestLow, highestHigh], bar) => [
      Math.min(lowestLow, bar.Low),
      Math.max(highestHigh, bar.High),
    ],
    [bars[0].Low, bars[0].High],
  );

export const getMinMax = (bars: BarData[]): [number, number] => {
  return [bars[0].Time, bars[bars.length - 1].Time];
};
