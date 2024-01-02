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

  const pageFromLocalStorage: number = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "pageNumber"
  );

  const jobModeTermFromLocalStorage: string = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobModeFilterTerm"
  );

  const jobTypeTermFromLocalStorage: string = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobTypeFilterTerm"
  );

  const searchTermFromLocalStorage: string = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "searchTerm"
  );

  const jobCategoryTermFromLocalStorage: string = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobCategoryFilterTerm"
  );

  return {
    pageFromLocalStorage,
    jobModeTermFromLocalStorage,
    searchTermFromLocalStorage,
    jobTypeTermFromLocalStorage,
    jobCategoryTermFromLocalStorage,
  };
};
