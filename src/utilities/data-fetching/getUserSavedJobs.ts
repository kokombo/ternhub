import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setUserSavedJobs } from "@/redux-toolkit/slices/job";
import { useSession } from "next-auth/react";

export const useGetUserSavedJobs = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const getUserSavedJobsRequest = async () => {
    const res = await axios.get("/api/bookmark", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  };

  const {
    data: savedJobs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<JobType[], AxiosError<ErrorResponse>>(
    "getUserSavedJobs",
    getUserSavedJobsRequest,
    {
      onSuccess: (data) => {
        dispatch(setUserSavedJobs(data));
      },
      refetchOnMount: "always",
      enabled: !!session,
    }
  );

  return { savedJobs, isLoading, isError, error, refetch };
};
