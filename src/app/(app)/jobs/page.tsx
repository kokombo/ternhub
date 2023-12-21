"use client";
import { useEffect, useState } from "react";
import { JobsFilter } from "@/components";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";
import { useRouter } from "next/navigation";

const JobsListPage = () => {
  const [locationFilterTerm, setLocationFilterTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const params = new URLSearchParams({
    location: locationFilterTerm,
    search: searchTerm,
  });

  const fetchJobsRequest = async (): Promise<JobType[] | undefined> => {
    return await axios.get(`/api/job?${params}`);
  };

  // const {
  //   isLoading,
  //   data,
  //   isError,
  //   error,
  //   isFetching,
  //   isSuccess,
  //   refetch,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   fetchPreviousPage,
  //   isFetchingPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  // } = useInfiniteQuery("getAllJobs", getJobsRequest);

  const { data, isLoading, isError, error, refetch, isSuccess } = useQuery(
    "fetchJobs",
    fetchJobsRequest,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        router.push(`/jobs?${params}`, undefined);
      },
    }
  );

  console.log("data", data, "isSuccess", isSuccess, "error", error);

  useEffect(() => {
    const refetchDataAfterFilterTermChanges = async () => {
      await refetch();
    };

    refetchDataAfterFilterTermChanges();
  }, [locationFilterTerm]);

  return (
    <div className="flex flex-col items-start w-full gap-[44px] md:gap-[64px]">
      <JobsFilter setLocationFilterTerm={setLocationFilterTerm} />

      <JobsList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No search results."
        refetch={refetch}
        rootUrl="/jobs"
      />
    </div>
  );
};

export default JobsListPage;
