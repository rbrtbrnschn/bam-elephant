import { IStorage } from "../interfaces/storage.interface";

export function useStorage(storage: Storage) {
  const setLocalStorage = (key: keyof IStorage, value: string) => {
    return storage.setItem(key, value);
  };

  const getLocaleStorage = (key: keyof IStorage) => {
    return storage.getItem(key);
  };
  return { setLocalStorage, getLocaleStorage };
}
