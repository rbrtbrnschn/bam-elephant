export interface ILocalStorage {
  "navbar.hasClickedLocales": string;
}

export const setLocalStorage = (key: keyof ILocalStorage, value: string) => {
  return localStorage.set(key, value);
};

export const getLocaleStorage = (key: keyof ILocalStorage) => {
  return localStorage.getItem(key);
};
