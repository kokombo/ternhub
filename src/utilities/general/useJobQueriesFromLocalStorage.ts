import { getValueByKeyInArray } from "./getValueByKeyInArray";
import { useRetrieveFromLocalStorage } from "../hooks";

export const useJobQueriesFromLocalStorage = (key: string) => {
  const queryArrayFromLocalStorage = useRetrieveFromLocalStorage(key);

  const page = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "pageNumber"
  ) as number;

  const mode = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobModeFilterTerm"
  ) as string;

  const type = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobTypeFilterTerm"
  ) as string;

  const searchQuery = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "searchTerm"
  ) as string;

  const category = getValueByKeyInArray(
    queryArrayFromLocalStorage,
    "jobCategoryFilterTerm"
  ) as string;

  return {
    page,
    mode,
    searchQuery,
    type,
    category,
  };
};
