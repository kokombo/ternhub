import axios from "axios";
import { useQuery } from "react-query";

export const getJobById = (jobId: string | null) => {
  const getJobByIdRequest = async (): Promise<JobType | undefined> => {
    const res = await axios.get(`/api/job?listing_id=${jobId}`);
    return res.data;
  };

  const {
    data: job,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useQuery(
    ["getJobById", jobId],

    getJobByIdRequest,

    {
      refetchOnWindowFocus: false,

      retry: 0,
    }
  );

  return { job, isLoading, isError, error, refetch, isSuccess };
};
