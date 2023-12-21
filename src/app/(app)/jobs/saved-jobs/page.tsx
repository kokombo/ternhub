"use client";
import { JobsList } from "@/containers";
import { useQuery } from "react-query";
import axios from "axios";

const SavedJobsPage = () => {
  const getUserSavedJobsRequest = async (): Promise<JobType[] | undefined> => {
    return await axios.get("/api/bookmark");
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "getUserSavedJobs",
    getUserSavedJobsRequest,
    { refetchOnWindowFocus: false }
  );

  return (
    <JobsList
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      noDataLabel="No saved jobs yet."
      refetch={refetch}
      rootUrl="/jobs"
    />
  );
};

export default SavedJobsPage;
