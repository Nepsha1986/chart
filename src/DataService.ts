export default class DataService<T> {
  private readonly _src;
  constructor(src: string) {
    this._src = src;
  }
  public async get(): Promise<T[]> {
    try {
      return await fetch(this._src).then((data) => data.json());
    } catch (e) {
      throw new Error(`Error fetching data from ${this._src}`);
    }
  }
}
