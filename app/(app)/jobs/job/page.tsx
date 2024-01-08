"use client";

import { JobInfopage } from "@/containers";
import { useSearchParams } from "next/navigation";
import { getJobById } from "@/utilities/data-fetching/getJobById";

const JobPage = () => {
  const searchParams = useSearchParams();

  const jobId = searchParams.get("listing_id");

  const { job, isLoading, isError, error, refetch } = getJobById(jobId);

  return (
    <JobInfopage
      data={job}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
};

export default JobPage;
