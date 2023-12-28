"use client";

import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { Message, JobCard } from "@/components";
import { getUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";

const SavedJobsPage = () => {
  let errorResponse: any;

  const { savedJobs, isError, isLoading, error, refetch } = getUserSavedJobs();

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
        [...Array(6)].map((_, index) => <JobSkeletonLoader key={index} />)
      ) : isError ? (
        <Message
          message={errorResponse.response?.data?.message}
          isError={isError}
          buttonLabel="Try again"
          onClickButton={async () => await refetch()}
        />
      ) : savedJobs && savedJobs.length < 1 ? (
        <Message message="There are no saved jobs." />
      ) : (
        savedJobs &&
        savedJobs.map((job) => (
          <JobCard props={job} key={job._id} rootUrl="/jobs" />
        ))
      )}
    </div>
  );
};

export default SavedJobsPage;
