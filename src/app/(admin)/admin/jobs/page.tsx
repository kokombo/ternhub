"use client";
import { JobsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";

const AdminJobsListPage = () => {
  const fetchJobsRequest = async (): Promise<JobType[] | undefined> => {
    return await axios.get("/api/job");
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "fetchJobs",
    fetchJobsRequest,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="py-11 lg:py-[50px] sm:px-[6.94%] px-5 flex flex-col gap-[25px]">
      <h1 className="text-[28px] font-medium self-center">Manage All Jobs</h1>

      <JobsList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel="No search results."
        refetch={refetch}
        rootUrl="/admin/jobs"
      />
    </div>
  );
};

export default AdminJobsListPage;
