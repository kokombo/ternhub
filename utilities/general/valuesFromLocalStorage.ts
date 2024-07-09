import { getValueByKeyInArray } from "./getValueByKeyInArray";

const getUserQueriesFromLocalStorage = (storageName: string) => {
  if (typeof window !== "undefined") {
    const storedUserQueries = localStorage.getItem(`${storageName}`);

    if (storedUserQueries) {
      const storedKeyValueArrays = JSON.parse(storedUserQueries);

      return storedKeyValueArrays;
    }
    return null;
  }
};

export const valuesFromLocalStorage = (storageName: string) => {
  const queryArrayFromLocalStorage =
    getUserQueriesFromLocalStorage(storageName);

  const pageFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "pageNumber"
  ) as number;

  const jobModeTermFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobModeFilterTerm"
  ) as string;

  const jobTypeTermFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobTypeFilterTerm"
  ) as string;

  const searchTermFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "searchTerm"
  ) as string;

  const jobCategoryTermFromLocalStorage = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobCategoryFilterTerm"
  ) as string;

  return {
    pageFromLocalStorage,
    jobModeTermFromLocalStorage,
    searchTermFromLocalStorage,
    jobTypeTermFromLocalStorage,
    jobCategoryTermFromLocalStorage,
  };
};
