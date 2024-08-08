import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetJobById = (jobId: string | null) => {
  const getJobByIdRequest = async () => {
    const res = await axios.get(`/api/job?listing_id=${jobId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  };

  const {
    data: job,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useQuery<JobType, AxiosError<ErrorResponse>>(
    ["getJobById", jobId],
    getJobByIdRequest,
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return { job, isLoading, isError, error, refetch, isSuccess };
};
