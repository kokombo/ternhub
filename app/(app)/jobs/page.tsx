"use client";

import { useEffect, useState } from "react";
import { JobsFilter } from "../../../components";
import { JobsList } from "../../../containers";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const JobsListPage = () => {
  const router = useRouter();

  const [locationFilterTerm, setLocationFilterTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const limit = 40;

  const params = new URLSearchParams();

  if (locationFilterTerm) params.append("mode", locationFilterTerm);
  params.append("page", pageNumber.toString());
  params.append("limit", limit.toString());

  //This removes location filter and query all jobs.
  if (locationFilterTerm == "all") params.delete("mode");

  const queryStrings = params.toString();

  const fetchJobsRequest = async (): Promise<Data | undefined> => {
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
    ["fetchJobs", pageNumber],

    fetchJobsRequest,

    {
      refetchOnWindowFocus: false,

      keepPreviousData: true,

      staleTime: 10 * 60 * 1000,

      retry: 1,

      onSuccess: () => {
        router.push(`/jobs?${queryStrings.replace(`&limit=${limit}`, "")}`);
      },

      onError: () => {
        router.push(`/jobs?${queryStrings.replace(`&limit=${limit}`, "")}`);
      },
    }
  );

  useEffect(() => {
    const refetchDataAfterFilterTermChanges = async () => {
      await refetch();
    };

    refetchDataAfterFilterTermChanges();
  }, [locationFilterTerm, refetch]);

  return (
    <div className="flex flex-col items-start w-full gap-[44px] md:gap-[64px]">
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
