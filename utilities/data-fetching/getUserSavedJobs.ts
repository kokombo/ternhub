import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setUserSavedJobs } from "@/redux-toolkit/slices/job";

export const getUserSavedJobs = () => {
  const dispatch = useDispatch();

  const getUserSavedJobsRequest = async (): Promise<JobType[] | undefined> => {
    const res = await axios.get("/api/bookmark");
    return res.data;
  };

  const {
    data: savedJobs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("getUserSavedJobs", getUserSavedJobsRequest, {
    onSuccess: (data) => {
      dispatch(setUserSavedJobs(data));
    },

    refetchOnWindowFocus: false,

    retry: 3,
  });

  return { savedJobs, isLoading, isError, error, refetch };
};
