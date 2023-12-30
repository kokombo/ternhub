"use client";

import { JobInfopage } from "@/containers";
import { useParams } from "next/navigation";
import { getJobById } from "@/utilities/data-fetching/getJobById";

const JobPage = () => {
  const { jobId } = useParams();

  const { job, isLoading, isError, error, refetch } = getJobById(jobId);

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
