const ANTENG_DATA = "antengData";
export class Data {
  constructor() {
    this.userName = null;
    this.load();
  }

  load() {
    const data = window.localStorage.getItem(ANTENG_DATA);

    if (!data) return;

    const object = JSON.parse(data);
    this.userName = object?.userName ?? null;
  }

  save() {
    const data = JSON.stringify(this);
    window.localStorage.setItem(ANTENG_DATA, data);
  }
}
//# sourceMappingURL=data.js.map
