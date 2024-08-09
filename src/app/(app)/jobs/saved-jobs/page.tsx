"use client";

import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { Message, JobCard } from "@/components";
import { useGetUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";
import { illustrations } from "@/constants";

const SavedJobsPage = () => {
  const { savedJobs, isError, isLoading, error, refetch } =
    useGetUserSavedJobs();

  if (isLoading) {
    return (
      <div className="w-full job_list_grid">
        {[...Array(6)].map((_, index) => (
          <JobSkeletonLoader key={index.toString()} />
        ))}
      </div>
    );
  }

  if (isError) {
    <div className="w-full flex items-center justify-center">
      <Message
        message={error?.response?.data?.message}
        isError={isError}
        buttonLabel="Try again"
        onClickButton={refetch}
        illustration={illustrations.error_2}
      />
    </div>;
  }

  if (savedJobs && savedJobs.length < 1) {
    return (
      <div className="w-full flex items-center justify-center">
        <Message
          message="Keep track of jobs you're interested in. Press the save button on a job card to save it for later."
          illustration={illustrations.no_saved_jobs}
        />
      </div>
    );
  }

  return (
    <div className="w-full job_list_grid">
      {savedJobs?.map((job) => (
        <JobCard props={job} key={job._id} rootUrl="/jobs" />
      ))}
    </div>
  );
};

export default SavedJobsPage;
