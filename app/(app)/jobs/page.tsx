"use client";

import { useEffect, useState } from "react";
import { JobsFilter } from "@/components";
import { JobsList } from "@/containers";
import { getUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";
import { getAllJobs } from "@/utilities/data-fetching/getAllJobs";
import { valuesFromLocalStorage } from "@/utilities/general/valuesFromLocalStorage";

const JobsListPage = () => {
  const { pageFromLocalStorage, locationTermFromLocalStorage } =
    valuesFromLocalStorage("userQueriesInJobsPage");

  const [locationFilterTerm, setLocationFilterTerm] = useState(
    locationTermFromLocalStorage || ""
  );

  const [pageNumber, setPageNumber] = useState(pageFromLocalStorage || 1);

  const limit = 10;

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

  //Storing a user's search queries in local storage to ensure persistence after page reload.
  const userSearchQueriesArray = [
    { key: "pageNumber", value: pageNumber },
    { key: "locationFilterTerm", value: locationFilterTerm },
  ];

  useEffect(() => {
    localStorage.setItem(
      "userQueriesInJobsPage",
      JSON.stringify(userSearchQueriesArray)
    );
  }, [pageNumber, locationFilterTerm]);

  return (
    <div className="flex flex-col w-full gap-6 md:gap-11">
      <div className="sticky w-full top-0 left-0 bg-white z-[100] py-5">
        <JobsFilter
          setLocationFilterTerm={setLocationFilterTerm}
          locationFilterTerm={locationFilterTerm}
        />
      </div>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No job matches your query."
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
