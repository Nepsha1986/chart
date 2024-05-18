export type BarData = {
  Time: number;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  TickVolume: number;
};
export interface DataModel {
  ChunkStart: number;
  Bars: BarData[];
}

export type DataResDto = [firstBar: DataModel, secondBar: DataModel];
export default class DataService {
  readonly #src;
  constructor(src: string) {
    this.#src = src;
  }
  public async get(): Promise<DataResDto> {
    try {
      return await fetch(this.#src).then((data) => data.json());
    } catch (e) {
      throw new Error(`Error fetching data from ${this.#src}`);
    }
  }
}
