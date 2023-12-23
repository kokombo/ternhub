"use client";

import { useEffect, useState } from "react";
import { JobsFilter, Search } from "@/components";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const JobsSearchResults = () => {
  const router = useRouter();
  let searchTerm = "Frontend developer";

  const [pageNumber, setPageNumber] = useState(1);
  const [locationFilterTerm, setLocationFilterTerm] = useState("");

  const limit = 40;

  const params = new URLSearchParams();

  if (locationFilterTerm) params.append("location", locationFilterTerm);
  if (searchTerm) params.append("search", searchTerm.toLocaleLowerCase());
  params.append("page", pageNumber.toString());
  params.append("limit", limit.toString());
  if (locationFilterTerm == "all") params.delete("location");

  const queryStrings = params.toString();

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
  }, [locationFilterTerm]);

  return (
    <div className="py-11 sm:px-[6.94%] px-5 flex flex-col gap-[44px] md:gap-[64px]">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <JobsFilter setLocationFilterTerm={setLocationFilterTerm} />

        <Search
          buttonLabel="Search"
          placeholder=""
          onChange={() => {}}
          value={searchTerm}
          onClickSearchButton={async () => await refetch()}
        />
      </div>

      <JobsList
        data={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No search results."
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
