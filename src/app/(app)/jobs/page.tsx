"use client";

import { useEffect, useState, useMemo } from "react";
import { JobsFilter } from "@/components";
import { JobsList } from "@/containers";
import { useGetAllJobs } from "@/utilities/data-fetching/getAllJobs";
import { useJobQueriesFromLocalStorage } from "@/utilities/general/useJobQueriesFromLocalStorage";
import { illustrations } from "@/constants";
import { useSetToLocalStorage } from "@/utilities/hooks";

const JobsPage = () => {
  const { page, mode, type, category } = useJobQueriesFromLocalStorage(
    "userQueriesInJobsPage"
  );

  const initialQueryTerms = useMemo(
    () => ({
      jobModeFilterTerm: mode || "",
      jobTypeFilterTerm: type || "",
      pageNumber: page || 1,
      jobCategoryFilterTerm: category || "",
      searchTerm: "",
      limit: 30,
    }),
    [mode, type, page, category]
  );

  const [queryTerms, setQueryTerms] = useState<QueryTerms>(initialQueryTerms);

  const {
    jobModeFilterTerm,
    jobTypeFilterTerm,
    pageNumber,
    jobCategoryFilterTerm,
    limit,
  } = queryTerms;

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();
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
    jobCategoryFilterTerm,
    pageNumber,
    limit,
  ]);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = useGetAllJobs(pageNumber, params, limit, "/");

  // biome-ignore lint:
  useEffect(() => {
    setQueryTerms((queryTerms) => ({
      ...queryTerms,
      pageNumber: 1,
    }));

    refetch();
  }, [jobModeFilterTerm, refetch, jobTypeFilterTerm, jobCategoryFilterTerm]);

  //Storing a user's search queries in local storage to ensure persistence after page reload and router change.
  const userSearchQueriesArray = useMemo(() => {
    return [
      { key: "pageNumber", value: pageNumber },
      { key: "jobModeFilterTerm", value: jobModeFilterTerm },
      { key: "jobTypeFilterTerm", value: jobTypeFilterTerm },
      { key: "jobCategoryFilterTerm", value: jobCategoryFilterTerm },
    ];
  }, [pageNumber, jobModeFilterTerm, jobTypeFilterTerm, jobCategoryFilterTerm]);

  useSetToLocalStorage("userQueriesInJobsPage", userSearchQueriesArray);

  return (
    <div className="flex flex-col w-full gap-6 md:gap-11">
      <div className="sticky w-full top-0 left-0 bg-white z-[100] py-5">
        <JobsFilter
          jobModeFilterTerm={jobModeFilterTerm}
          jobTypeFilterTerm={jobTypeFilterTerm}
          jobCategoryFilterTerm={jobCategoryFilterTerm}
          setQueryTerms={setQueryTerms}
        />
      </div>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No job found for your query. Try a new query to see available jobs."
        refetch={refetch}
        rootUrl="/jobs"
        isFetching={isFetching}
        isPreviousData={isPreviousData}
        pageNumber={pageNumber}
        limit={limit}
        resultsCountPerQuery={data?.numOfJobsAfterQuery as number}
        totalJobs={data?.totalJobsCountBeforePagination as number}
        noDataIllustration={illustrations.no_search_result}
        setQueryTerms={setQueryTerms}
      />
    </div>
  );
};

export default JobsPage;
