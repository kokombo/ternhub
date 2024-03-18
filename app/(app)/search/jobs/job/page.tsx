"use client";

import { JobInfopage } from "@/containers";
import { useSearchParams } from "next/navigation";
import { useGetJobById } from "@/utilities/data-fetching/getJobById";

const JobPage = () => {
  const searchParams = useSearchParams();

  const jobId = searchParams.get("listing_id");

  const { job, isLoading, isError, error, refetch } = useGetJobById(jobId);

  return (
    <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5">
      <JobInfopage
        data={job}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default JobPage;
