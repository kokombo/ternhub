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
    return await axios.get(`/api/job/${jobId}`);
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "getJobById",
    getJobByIdRequest,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        router.push(`jobId=${data?.id}&title=${data?.slug}`);
      },
    }
  );

  return (
    <div>
      <JobInfopage
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default AdminJobInfoPage;
