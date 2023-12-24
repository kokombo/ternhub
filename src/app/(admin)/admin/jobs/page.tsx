"use client";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const AdminJobsListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const limit = 40;

  const router = useRouter();

  const params = new URLSearchParams();

  params.append("page", pageNumber.toString());
  params.append("limit", limit.toString());

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

      onSuccess: () => {
        router.push(`/admin/jobs?page=${pageNumber}`, undefined);
      },
    }
  );

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
