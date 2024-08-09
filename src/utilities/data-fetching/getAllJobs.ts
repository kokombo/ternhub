import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux-toolkit/slices/job";

export const useGetAllJobs = (
  pageNumber: number,
  queryStrings: string,
  limit: number,
  baseUrl: string
) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchJobsRequest = async () => {
    router.push(
      `${baseUrl}jobs?${queryStrings.replace(`&limit=${limit}`, "")}`
    );

    const res = await axios.get(`/api/jobs?${queryStrings}`, {
      headers: {
        Accept: "application/json",
      },
    });
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
  } = useQuery<JobsResponse, AxiosError<ErrorResponse>>(
    ["fetchJobs", pageNumber],
    fetchJobsRequest,
    {
      keepPreviousData: true,
      retry: 1,
      cacheTime: 5 * 60 * 1000,
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
