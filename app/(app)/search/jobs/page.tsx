"use client";

import { useEffect, useMemo, useState } from "react";
import { JobsFilter, Search } from "@/components";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { valuesFromLocalStorage } from "@/utilities/general/valuesFromLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { illustrations } from "@/constants";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const {
  pageFromLocalStorage,
  locationTermFromLocalStorage,
  searchTermFromLocalStorage,
} = valuesFromLocalStorage("userQueriesInSearch");

const JobsSearchResults = () => {
  const router = useRouter();

  const { jobSearchTerm: newJobSearchTerm } = useSelector(
    (state: StateType) => state.search
  ); //From global state manager

  const [pageNumber, setPageNumber] = useState(pageFromLocalStorage || 1);

  const [locationFilterTerm, setLocationFilterTerm] = useState(
    locationTermFromLocalStorage || ""
  );

  const [searchTerm, setSearchTerm] = useState(
    newJobSearchTerm || searchTermFromLocalStorage
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

  const urlWithQueryStrings = `/search/jobs?${queryStrings
    .replace(`&limit=${limit}`, "")
    .replace("search", "query")}&ref_ctx_id=${search_id}`;

  const fetchJobsInSearchRequest = async (): Promise<Data | undefined> => {
    router.push(urlWithQueryStrings);

    const res = await axios.get("/api/job?" + queryStrings);

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
  } = useQuery(
    ["fetchJobsInSearch", pageNumber],

    fetchJobsInSearchRequest,

    {
      refetchOnWindowFocus: false,

      keepPreviousData: true,

      retry: 1,
    }
  );

  useEffect(() => {
    const refetchDataAfterLocationFilterTermChanges = async () => {
      await refetch();
    };

    refetchDataAfterLocationFilterTermChanges();
  }, [locationFilterTerm, refetch]);

  //Storing a user's search queries in local storage to ensure persistence after page reload.
  const userSearchQueriesArray = useMemo(() => {
    return [
      { key: "searchTerm", value: searchTerm },
      { key: "pageNumber", value: pageNumber },
      { key: "locationFilterTerm", value: locationFilterTerm },
    ];
  }, [searchTerm, pageNumber, locationFilterTerm]);

  useEffect(() => {
    localStorage.setItem(
      "userQueriesInSearch",
      JSON.stringify(userSearchQueriesArray)
    );
  }, [userSearchQueriesArray]);

  return (
    <div className="py-6 md:py-11 sm:px-[6.94%] px-5 flex flex-col gap-4 lg:gap-6 md:gap-11 w-full">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between lg:gap-0 gap-4 sticky w-full top-0 left-0 bg-white z-[100] py-3">
        <JobsFilter
          setLocationFilterTerm={setLocationFilterTerm}
          locationFilterTerm={locationFilterTerm}
        />

        <Search
          buttonLabel="Search"
          placeholder=""
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onClickSearchButton={async () => {
            localStorage.removeItem("userQueriesInSearch");

            await refetch();
          }}
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
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        limit={limit}
        totalCount={data?.numOfJobs as number}
        noDataIllustration={illustrations.no_search_result}
      />
    </div>
  );
};

export default JobsSearchResults;
