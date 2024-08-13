import storage from "./storage.js";

class Store {
  constructor(storage) {
    this.storage = storage;
  }

  search(keyword) {
    this.addHistory(keyword);

    return this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return [...this.storage.keywordData];
  }

  getHistoryList() {
    return [...this.storage.historyData.sort(this._sortHistory)];
  }

  _sortHistory(history1, history2) {
    return history2.date > history1.date;
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    );
  }
}

const store = new Store("test");
export default store;
