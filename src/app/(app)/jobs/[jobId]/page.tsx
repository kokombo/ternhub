"use client";
import { JobInfopage } from "@/containers";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";

const JobPage = () => {
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
  } = useQuery("getJobById", getJobByIdRequest, {
    refetchOnWindowFocus: false,
    onSuccess: (job) => {
      router.push(`jobId=${job?.id}&title=${job?.slug}`);
    },
  });

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
