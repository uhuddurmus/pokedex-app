
export class AppStoreClass {
  store(key: string, data: any) {
    return this.set(key, data);
  }

  set(key: string, data: any) {
    return localStorage.setItem(key, data);
  }


  storeIfMissingFromArray(key: string, data: any) {
    const storedData = this.get(key);
    if (storedData) {
      const tempData = JSON.parse(storedData);
      if (Array.isArray(tempData)) {
        const index = tempData.findIndex((d: any) => d.id === data.id);
        if (index === -1) {
          tempData.push(data);
          return this.store(key, JSON.stringify(tempData));
        }
      }
    } else {
      this.store(key, JSON.stringify([data]));
    }
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  delete(key: string) {
    return localStorage.removeItem(key);
  }

  deleteAll() {
    localStorage.clear();
  }
}

const AppStore = new AppStoreClass();
export default AppStore;
