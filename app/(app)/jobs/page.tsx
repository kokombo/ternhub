"use client";

import { useEffect, useState } from "react";
import { JobsFilter } from "@/components";
import { JobsList } from "@/containers";
import { getUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";
import { getAllJobs } from "@/utilities/data-fetching/getAllJobs";

const JobsListPage = () => {
  const [locationFilterTerm, setLocationFilterTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const limit: number = 40;

  const params = new URLSearchParams();

  if (locationFilterTerm) params.append("mode", locationFilterTerm);
  params.append("page", pageNumber.toString());
  params.append("limit", limit.toString());
  if (locationFilterTerm == "all") params.delete("mode");

  const queryStrings = params.toString();

  const baseUrl = "/";

  getUserSavedJobs();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = getAllJobs(pageNumber, queryStrings, limit, baseUrl);

  useEffect(() => {
    const refetchDataAfterFilterTermChanges = async () => {
      await refetch();
    };

    refetchDataAfterFilterTermChanges();
  }, [locationFilterTerm, refetch]);

  return (
    <div className="flex flex-col w-full gap-[44px] md:gap-[64px]">
      <JobsFilter setLocationFilterTerm={setLocationFilterTerm} />

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No results matches your query."
        refetch={refetch}
        rootUrl="/jobs"
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

export default JobsListPage;
