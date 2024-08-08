import { useEffect } from "react";

type LocalStorageValue =
  | string
  | number
  | boolean
  | Array<{ key: string; value: string } | { key: string; value: number }>;

export const useSetToLocalStorage = (key: string, value: LocalStorageValue) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
};

export const useRetrieveFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData;
    }
    return null;
  }
};
