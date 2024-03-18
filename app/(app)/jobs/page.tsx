"use client";

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { JobsFilter } from "@/components";
import { JobsList } from "@/containers";
import { useGetAllJobs } from "@/utilities/data-fetching/getAllJobs";
import { valuesFromLocalStorage } from "@/utilities/general/valuesFromLocalStorage";
import { illustrations } from "@/constants";

const JobsListPage = () => {
  const {
    pageFromLocalStorage,
    jobModeTermFromLocalStorage,
    jobTypeTermFromLocalStorage,
    jobCategoryTermFromLocalStorage,
  } = valuesFromLocalStorage("userQueriesInJobsPage"); //Getting filter queries from localstorage as the component mounts.

  const initialQueryTerms = {
    jobModeFilterTerm: jobModeTermFromLocalStorage || "",
    jobTypeFilterTerm: jobTypeTermFromLocalStorage || "",
    pageNumber: pageFromLocalStorage || 1,
    jobCategoryFilterTerm: jobCategoryTermFromLocalStorage || "",
  };

  const [queryTerms, setQueryTerms] = useState(initialQueryTerms);

  const {
    jobModeFilterTerm,
    jobTypeFilterTerm,
    pageNumber,
    jobCategoryFilterTerm,
  } = queryTerms;

  const limit = 30;

  const params = new URLSearchParams();

  if (jobModeFilterTerm) params.append("mode", jobModeFilterTerm);

  if (jobTypeFilterTerm) params.append("type", jobTypeFilterTerm);

  if (jobCategoryFilterTerm) params.append("category", jobCategoryFilterTerm);

  params.append("page", pageNumber.toString());

  params.append("limit", limit.toString());

  if (jobModeFilterTerm == "all") params.delete("mode");

  if (jobTypeFilterTerm == "all") params.delete("type");

  if (jobCategoryFilterTerm == "all") params.delete("category");

  const queryStrings = params.toString();

  const baseUrl = "/";

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = useGetAllJobs(pageNumber, queryStrings, limit, baseUrl);

  //Onchange handler for filter terms.
  const filterTermOnchange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const refetchDataAfterFilterTermChanges = () => {
      setQueryTerms((queryTerms) => ({
        ...queryTerms,
        pageNumber: 1,
      }));

      refetch();
    };

    refetchDataAfterFilterTermChanges();
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

  useEffect(() => {
    localStorage.setItem(
      "userQueriesInJobsPage",
      JSON.stringify(userSearchQueriesArray)
    );
  }, [userSearchQueriesArray]);

  return (
    <div className="flex flex-col w-full gap-6 md:gap-11">
      <div className="sticky w-full top-0 left-0 bg-white z-[100] py-5">
        <JobsFilter
          onchangeJobModeFilterTerm={filterTermOnchange}
          jobModeFilterTerm={jobModeFilterTerm}
          jobTypeFilterTerm={jobTypeFilterTerm}
          onchangeJobTypeFilterTerm={filterTermOnchange}
          jobCategoryFilterTerm={jobCategoryFilterTerm}
          onChangeJobCategoryFilterTerm={filterTermOnchange}
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
    </div>
  );
};

export default JobsListPage;
