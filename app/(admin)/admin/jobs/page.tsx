"use client";

import { JobsList } from "@/containers";
import { useState } from "react";
import { getAllJobs } from "@/utilities/data-fetching/getAllJobs";
import { illustrations } from "@/constants";

const AdminJobsListPage = () => {
  const initialQueryTerms = {
    pageNumber: 1,
    limit: 20,
  };

  const [queryTerms, setQueryTerms] = useState(initialQueryTerms);

  const { pageNumber, limit } = queryTerms;

  const baseUrl = "/admin/";

  const params = new URLSearchParams();

  params.append("page", pageNumber.toString());
  params.append("limit", limit.toString());

  const queryStrings = params.toString();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = getAllJobs(pageNumber, queryStrings, limit, baseUrl);

  return (
    <div className="py-11 lg:py-[50px] sm:px-[6.94%] px-5 flex flex-col gap-[25px]">
      <h1 className="text-[28px] font-medium self-center">Manage All Jobs</h1>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No job found for your search. Try a new search or use the category filter to see available jobs."
        refetch={refetch}
        rootUrl="/admin/jobs"
        isFetching={isFetching}
        isPreviousData={isPreviousData}
        pageNumber={pageNumber}
        limit={limit}
        resultsCountPerQuery={data?.numOfJobsAfterQuery as number}
        totalJobs={data?.totalJobsCountBeforePagination as number}
        noDataIllustration={illustrations.no_search_result}
        onClickPrevButton={() =>
          setQueryTerms((prev) => ({
            ...prev,
            pageNumber: Math.max(prev.pageNumber - 1, 1),
          }))
        }
        onClickNextButton={() =>
          setQueryTerms((prev) => ({
            ...prev,
            pageNumber: prev.pageNumber + 1,
          }))
        }
      />
    </div>
  );
};

export default AdminJobsListPage;
