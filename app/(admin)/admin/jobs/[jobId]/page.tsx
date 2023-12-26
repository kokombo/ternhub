"use client";

import { useParams } from "next/navigation";
import { JobInfopage } from "@/containers";
import { AdminToolBox } from "@/components";
import { getJobById } from "@/utilities/data-fetching/getJobById";

const AdminJobInfoPage = () => {
  const { jobId } = useParams();

  const { job, isLoading, isError, error, refetch } = getJobById(jobId);

  return (
    <div>
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

export default AdminJobInfoPage;
