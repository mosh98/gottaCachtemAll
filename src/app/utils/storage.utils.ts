export class StorageUtil {
  // Stores json of trainer to local storage.
  static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static storageClear(): void {
    localStorage.clear();
  }

  // Fetches and parses json of trainer from local storage.
  static storageRead<T>(key: string): T | undefined {
    const storedValue = localStorage.getItem(key);
    try {
      if (storedValue) return JSON.parse(storedValue);
      return undefined;
    } catch (e) {
      localStorage.removeItem(key);
      return undefined;
    }
  }
}
