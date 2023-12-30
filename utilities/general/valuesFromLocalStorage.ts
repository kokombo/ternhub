"use client";

import { getValueByKeyInArray } from "./getValueByKeyInArray";

const getUserQueriesFromLocalStorage = (storageName: string) => {
  if (typeof window !== "undefined") {
    const storedUserQueries = localStorage.getItem(`${storageName}`);

    if (storedUserQueries) {
      const storedKeyValueArrays = JSON.parse(storedUserQueries);

      return storedKeyValueArrays;
    } else {
      return null;
    }
  }
};

export const valuesFromLocalStorage = (storageName: string) => {
  const queryArrayFromLocalStorage: any[] =
    getUserQueriesFromLocalStorage(storageName);

  const pageFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "pageNumber"
  );

  const locationTermFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "locationFilterTerm"
  );

  const searchTermFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "searchTerm"
  );

  return {
    pageFromLocalStorage,
    locationTermFromLocalStorage,
    searchTermFromLocalStorage,
  };
};
