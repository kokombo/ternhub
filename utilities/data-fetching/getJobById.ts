import axios from "axios";
import { useQuery } from "react-query";

export const getJobById = (jobId: string | string[]) => {
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
    }
  );

  return { job, isLoading, isError, error, refetch };
};
