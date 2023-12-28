"use client";

import { JobsList } from "@/containers";
import { useState } from "react";
import { getAllJobs } from "@/utilities/data-fetching/getAllJobs";

const AdminJobsListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const limit: number = 14;

  const baseUrl: string = "/admin/";

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
        noDataLabel="No search results."
        refetch={refetch}
        rootUrl="/admin/jobs"
        isFetching={isFetching}
        isPreviousData={isPreviousData}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        limit={limit}
        totalCount={data?.numOfJobs as number}
      />
    </div>
  );
};

export default AdminJobsListPage;
