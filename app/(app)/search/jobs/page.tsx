"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { JobsFilter, Search } from "@/components";
import { JobsList } from "@/containers";
import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { StateType } from "@/redux-toolkit/store";
import { valuesFromLocalStorage } from "@/utilities/general/valuesFromLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { illustrations } from "@/constants";

type JobsResults = {
  jobs: JobType[];
  numOfJobsAfterQuery: number;
  totalJobsCountBeforePagination: number;
};

const JobsSearchResults = () => {
  const {
    pageFromLocalStorage,
    jobModeTermFromLocalStorage,
    searchTermFromLocalStorage,
    jobTypeTermFromLocalStorage,
    jobCategoryTermFromLocalStorage,
  } = valuesFromLocalStorage("userQueriesInSearch"); //Retrieving user's search/filter queries stored in logal storage

  const { jobSearchTerm: newJobSearchTerm } = useSelector(
    (state: StateType) => state.search
  );

  const initialQueryTerms = {
    searchTerm: newJobSearchTerm || searchTermFromLocalStorage,
    jobModeFilterTerm: jobModeTermFromLocalStorage || "",
    jobTypeFilterTerm: jobTypeTermFromLocalStorage || "",
    pageNumber: pageFromLocalStorage || 1,
    limit: 30,
    jobCategoryFilterTerm: jobCategoryTermFromLocalStorage || "",
  };

  const [queryTerms, setQueryTerms] = useState(initialQueryTerms);

  const {
    jobModeFilterTerm,
    jobTypeFilterTerm,
    pageNumber,
    limit,
    searchTerm,
    jobCategoryFilterTerm,
  } = queryTerms;

  const router = useRouter();
  const search_id = uuidv4();

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append("search", searchTerm);
    if (jobModeFilterTerm && jobModeFilterTerm !== "all")
      searchParams.append("mode", jobModeFilterTerm);
    if (jobTypeFilterTerm && jobTypeFilterTerm !== "all")
      searchParams.append("type", jobTypeFilterTerm);
    if (jobCategoryFilterTerm && jobCategoryFilterTerm !== "all")
      searchParams.append("category", jobCategoryFilterTerm);
    searchParams.append("page", pageNumber.toString());
    searchParams.append("limit", limit.toString());
    return searchParams.toString();
  }, [
    jobModeFilterTerm,
    jobTypeFilterTerm,
    searchTerm,
    limit,
    jobCategoryFilterTerm,
    pageNumber,
  ]);

  const urlWithQueryStrings = `/search/jobs?${params
    .replace(`&limit=${limit}`, "")
    .replace("search", "query")}&ref_ctx_id=${search_id}`;

  const fetchJobsInSearchRequest = async () => {
    router.push(urlWithQueryStrings);
    const res = await axios.get(`/api/jobs?${params}`);
    return res.data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery<JobsResults, AxiosError<ErrorResponse>>(
    ["fetchJobsInSearch", pageNumber],

    fetchJobsInSearchRequest,

    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retry: 1,
    }
  );

  //Onchange handler for filter terms.
  const onChangeFilterTerm = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    refetch();
  }, [jobModeFilterTerm, refetch, jobTypeFilterTerm, jobCategoryFilterTerm]);

  //Storing a user's search queries in local storage to ensure persistence after page reload.
  const userSearchQueriesArray = useMemo(() => {
    return [
      { key: "searchTerm", value: searchTerm },
      { key: "pageNumber", value: pageNumber },
      { key: "jobModeFilterTerm", value: jobModeFilterTerm },
      { key: "jobTypeFilterTerm", value: jobTypeFilterTerm },
      { key: "jobCategoryFilterTerm", value: jobCategoryFilterTerm },
    ];
  }, [
    searchTerm,
    pageNumber,
    jobModeFilterTerm,
    jobTypeFilterTerm,
    jobCategoryFilterTerm,
  ]);

  useEffect(() => {
    localStorage.setItem(
      "userQueriesInSearch",
      JSON.stringify(userSearchQueriesArray)
    );
  }, [userSearchQueriesArray]);

  return (
    <main className="py-6 md:py-11 sm:px-[6.94%] px-5 flex flex-col gap-4 lg:gap-6 md:gap-11 w-full">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between lg:gap-0 gap-4 sticky w-full top-0 left-0 bg-white z-[100] py-3">
        <JobsFilter
          onchangeJobModeFilterTerm={onChangeFilterTerm}
          jobModeFilterTerm={jobModeFilterTerm}
          jobTypeFilterTerm={jobTypeFilterTerm}
          onchangeJobTypeFilterTerm={onChangeFilterTerm}
          jobCategoryFilterTerm={jobCategoryFilterTerm}
          onChangeJobCategoryFilterTerm={onChangeFilterTerm}
        />

        <Search
          buttonLabel="Search"
          placeholder=""
          onChange={(e) =>
            setQueryTerms((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
          value={searchTerm}
          onClickSearchButton={refetch}
          lgFrameWidth={556}
          lgInputWidth={250}
        />
      </div>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No job found for your search. Try a new search or use the category filter to see available jobs."
        refetch={refetch}
        rootUrl="/search/jobs"
        isFetching={isFetching}
        isPreviousData={isPreviousData}
        pageNumber={pageNumber}
        limit={limit}
        resultsCountPerQuery={data?.numOfJobsAfterQuery as number}
        totalJobs={data?.totalJobsCountBeforePagination as number}
        noDataIllustration={illustrations.no_search_result}
        onClickPrevButton={() =>
          setQueryTerms((queryTerms) => ({
            ...queryTerms,
            pageNumber: Math.max(queryTerms.pageNumber - 1, 1),
          }))
        }
        onClickNextButton={() =>
          setQueryTerms((queryTerms) => ({
            ...queryTerms,
            pageNumber: queryTerms.pageNumber + 1,
          }))
        }
      />
    </main>
  );
};

export default JobsSearchResults;
