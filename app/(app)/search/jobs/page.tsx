"use client";

import { useEffect, useState } from "react";
import { JobsFilter, Search } from "@/components";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { setJobSearchTerm } from "@/redux-toolkit/slices/search";
import { getUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const JobsSearchResults = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { jobSearchTerm } = useSelector((state: StateType) => state.search);

  const [pageNumber, setPageNumber] = useState(1);
  const [locationFilterTerm, setLocationFilterTerm] = useState("");

  const limit = 40;

  const params = new URLSearchParams();

  if (jobSearchTerm) params.append("search", jobSearchTerm);
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
        router.push(
          `/search/jobs?${queryStrings
            .replace(`&limit=${limit}`, "")
            .replace("search", "query")}`
        );
      },

      onError: () => {
        router.push(
          `/search/jobs?${queryStrings
            .replace(`&limit=${limit}`, "")
            .replace("search", "query")}`
        );
      },
    }
  );

  useEffect(() => {
    const refetchDataAfterLocationFilterTermChanges = async () => {
      await refetch();
    };

    refetchDataAfterLocationFilterTermChanges();
  }, [locationFilterTerm, refetch]);

  return (
    <div className="py-11 sm:px-[6.94%] px-5 flex flex-col gap-[44px] md:gap-[64px]">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between lg:gap-0 gap-4">
        <JobsFilter setLocationFilterTerm={setLocationFilterTerm} />

        <Search
          buttonLabel="Search"
          placeholder=""
          onChange={(e) => dispatch(setJobSearchTerm(e.target.value))}
          value={jobSearchTerm}
          onClickSearchButton={async () => await refetch()}
          lgFrameWidth="556px"
          lgInputWidth="300px"
        />
      </div>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="There are no available jobs that match your query."
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

export default JobsSearchResults;
