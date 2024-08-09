import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetJobById = (jobId: string | undefined | null) => {
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
      cacheTime: 24 * 60 * 60 * 1000,
      enabled: !!jobId,
    }
  );

  return { job, isLoading, isError, error, refetch, isSuccess };
};
