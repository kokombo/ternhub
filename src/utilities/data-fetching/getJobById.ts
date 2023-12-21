import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

export const getJobById = async (jobId: string | string[]) => {
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

  return { data, isLoading, isError, error, refetch };
};
