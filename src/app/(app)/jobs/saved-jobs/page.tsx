"use client";
import { useQuery } from "react-query";
import axios from "axios";
import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { Message, JobCard } from "@/components";

const SavedJobsPage = () => {
  const getUserSavedJobsRequest = async (): Promise<JobType[] | undefined> => {
    const res = await axios.get("/api/bookmark");
    return res.data;
  };

  let errorResponse: any;

  const {
    data: savedJobs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("getUserSavedJobs", getUserSavedJobsRequest, {
    refetchOnWindowFocus: false,
  });

  if (error) errorResponse = error;

  return (
    <div
      className={`w-full ${
        (savedJobs && savedJobs.length > 0) || isLoading
          ? "job_list_grid"
          : "flex items-center justify-center"
      } `}
    >
      {isLoading ? (
        [...Array(10)].map((_, index) => <JobSkeletonLoader key={index} />)
      ) : isError ? (
        <Message
          message={errorResponse.response?.data?.message}
          isError={isError}
          buttonLabel="Try again"
          onClickButton={async () => await refetch()}
        />
      ) : savedJobs && savedJobs.length < 1 ? (
        <div className="flex items-center justify-center h-48">
          <Message message="There are no saved jobs." />
        </div>
      ) : (
        savedJobs?.map((job) => (
          <JobCard props={job} key={job.id} rootUrl="/" />
        ))
      )}
    </div>
  );
};

export default SavedJobsPage;
