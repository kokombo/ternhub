import axios, { type AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useBookmarkAJob = (jobId: string) => {
  const queryClient = useQueryClient();

  const bookmarkAJobRequest = async (jobId: string) => {
    const res = await axios.put("/api/bookmark", JSON.stringify(jobId), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const { mutateAsync, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >("bookmarkAJob", bookmarkAJobRequest, {
    onSuccess: () => {
      queryClient.refetchQueries("getUserSavedJobs");
    },
    onError: (error) => {
      toast.error(`${error.response?.data.message}`);
    },
  });

  const bookmarkAndUnbookmarkAJob = async () => {
    await mutateAsync(jobId);
  };

  return { isError, error, bookmarkAndUnbookmarkAJob };
};
