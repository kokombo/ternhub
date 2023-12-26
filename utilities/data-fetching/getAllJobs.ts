import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux-toolkit/slices/job";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

export const getAllJobs = (
  pageNumber: number,
  queryStrings: string,
  limit: number,
  baseUrl: string
) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const fetchJobsRequest = async (): Promise<Data | undefined> => {
    const res = await axios.get("/api/job?" + queryStrings);
    return res.data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["fetchJobs", pageNumber],

    fetchJobsRequest,

    {
      refetchOnWindowFocus: false,

      keepPreviousData: true,

      staleTime: 10 * 60 * 1000,

      retry: 1,

      onSuccess: (data) => {
        dispatch(setAllJobs(data?.jobs));

        router.push(
          `${baseUrl}jobs?${queryStrings.replace(`&limit=${limit}`, "")}`
        );
      },

      onError: () => {
        router.push(
          `${baseUrl}jobs?${queryStrings.replace(`&limit=${limit}`, "")}`
        );
      },
    }
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  };
};
