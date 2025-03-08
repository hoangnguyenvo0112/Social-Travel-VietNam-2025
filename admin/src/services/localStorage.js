export const localStorageHelper = {
  // get value from local storage
  get(key) {
    const stored = localStorage.getItem(key);
    return stored == null ? undefined : JSON.parse(stored);
  },
  // add value to local storage
  store(key, value) {
    localStorage.setItem(key, value);
  },
  // change value from local storage
  modify(key, fn) {
    this.store(key, fn(this.load(key)));
  },
  // remove value from local storage
  remove(key) {
    localStorage.removeItem(key);
  },
  appendItemToArray: (item, storageID) => {
    this.modify(storageID, (storage = []) => [...storage, item]);
  },
  removeItemFromArray: (item, storageID) => {
    this.modify(storageID, (storage = []) => storage.filter((s) => s !== item));
  },
  saveItemToObject: (item, storageID) => {
    this.modify(storageID, (storage = {}) => ({ ...storage, item }));
  },
  
};
