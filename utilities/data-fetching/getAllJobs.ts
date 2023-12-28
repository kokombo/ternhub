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
    router.push(
      `${baseUrl}jobs?${queryStrings.replace(`&limit=${limit}`, "")}`
    );

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

      retry: 1,

      onSuccess: (data) => {
        dispatch(setAllJobs(data?.jobs));
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
