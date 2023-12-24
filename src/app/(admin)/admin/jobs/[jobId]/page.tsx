"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { JobInfopage } from "@/containers";
import { AdminToolBox } from "@/components";

const AdminJobInfoPage = () => {
  const { jobId } = useParams();

  const router = useRouter();

  const getJobByIdRequest = async (): Promise<JobType | undefined> => {
    const res = await axios.get(`/api/job/${jobId}`);
    return res.data;
  };

  const {
    data: job,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    "getJobById",

    getJobByIdRequest,

    {
      refetchOnWindowFocus: false,

      retry: 1,

      onSuccess: (job) => {
        // router.push(`/admin/job/`, undefined);
      },
    }
  );

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
