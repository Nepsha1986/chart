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

export const formatDate = (date: number): string => {
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}:${seconds}`;
};
