export class StorageUtil {
  // Stores json of trainer to session storage.
  static storageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Fetches and parses json of trainer from session storage.
  static storageRead<T>(key: string): T | undefined {
    const storedValue = sessionStorage.getItem(key);
    try {
      if (storedValue) return JSON.parse(storedValue);
      return undefined;
    } catch (e) {
      sessionStorage.removeItem(key);
      return undefined;
    }
  }
}
