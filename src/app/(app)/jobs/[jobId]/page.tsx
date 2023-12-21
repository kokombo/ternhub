"use client";
import { JobInfopage } from "@/containers";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";

const JobPage = () => {
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
    <JobInfopage
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
};

export default JobPage;
