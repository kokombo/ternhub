"use client";

import { useEffect, useState } from "react";
import { JobsFilter, Search } from "@/components";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { getUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";
import { valuesFromLocalStorage } from "@/utilities/general/valuesFromLocalStorage";
import { v4 as uuidv4 } from "uuid";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const JobsSearchResults = () => {
  const router = useRouter();

  const {
    pageFromLocalStorage,
    locationTermFromLocalStorage,
    searchTermFromLocalStorage,
  } = valuesFromLocalStorage("userQueriesInSearch");

  const { jobSearchTerm } = useSelector((state: StateType) => state.search); //From global state

  const [pageNumber, setPageNumber] = useState(pageFromLocalStorage || 1);

  const [locationFilterTerm, setLocationFilterTerm] = useState(
    locationTermFromLocalStorage || ""
  );

  const [searchTerm, setSearchTerm] = useState(
    jobSearchTerm || searchTermFromLocalStorage
  );

  const limit = 40;

  const search_id = uuidv4();

  const params = new URLSearchParams();

  if (searchTerm) params.append("search", searchTerm);

  if (locationFilterTerm) params.append("mode", locationFilterTerm);

  params.append("page", pageNumber.toString());

  params.append("limit", limit.toString());

  if (locationFilterTerm == "all") params.delete("mode");

  const queryStrings = params.toString();

  getUserSavedJobs();

  const fetchJobsInSearchRequest = async (): Promise<Data | undefined> => {
    const res = await axios.get("/api/job?" + queryStrings);
    return res.data;
  };

  const urlWithQueryStrings = `/search/jobs?${queryStrings
    .replace(`&limit=${limit}`, "")
    .replace("search", "query")}&ref_ctx_id=${search_id}`;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["fetchJobsInSearch", pageNumber],

    fetchJobsInSearchRequest,

    {
      refetchOnWindowFocus: false,

      keepPreviousData: true,

      retry: 1,

      staleTime: 10 * 60 * 1000,

      onSuccess: () => {
        router.push(urlWithQueryStrings);
      },

      onError: () => {
        router.push(urlWithQueryStrings);
      },
    }
  );

  useEffect(() => {
    const refetchDataAfterLocationFilterTermChanges = async () => {
      await refetch();
    };

    refetchDataAfterLocationFilterTermChanges();
  }, [locationFilterTerm, refetch]);

  //Storing a user's search queries in local storage to ensure persistence after page reload.
  const userSearchQueriesArray = [
    { key: "searchTerm", value: searchTerm },
    { key: "pageNumber", value: pageNumber },
    { key: "locationFilterTerm", value: locationFilterTerm },
  ];

  useEffect(() => {
    localStorage.setItem(
      "userQueriesInSearch",
      JSON.stringify(userSearchQueriesArray)
    );
  }, [searchTerm, pageNumber, locationFilterTerm]);

  return (
    <div className="py-11 sm:px-[6.94%] px-5 flex flex-col gap-6 md:gap-11">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between lg:gap-0 gap-4 sticky w-full top-0 left-0 bg-white z-[100] py-5">
        <JobsFilter
          setLocationFilterTerm={setLocationFilterTerm}
          locationFilterTerm={locationFilterTerm}
        />

        <Search
          buttonLabel="Search"
          placeholder=""
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onClickSearchButton={async () => await refetch()}
          lgFrameWidth="556px"
          lgInputWidth="250px"
        />
      </div>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="There are no available jobs that match your query."
        refetch={refetch}
        rootUrl="/search/jobs"
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

export default JobsSearchResults;
