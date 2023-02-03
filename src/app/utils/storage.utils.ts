export class StorageUtil {
  // Stores json of trainer to local storage.

  /**
   * Save data to local storage
   * @param key
   * @param value
   * @returns void
   */
  static storageSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Clear local storage
   * @returns void
   */

  static storageClear(): void {
    localStorage.clear();
  }

  /**
   * Read data from local storage
   * @param key
   * @returns T
   *
   */
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
