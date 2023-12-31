import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const bookmarkAJob = (jobId: string) => {
  const queryClient = useQueryClient();

  const bookmarkAJobRequest = async (
    jobId: string
  ): Promise<JobType[] | undefined> => {
    const res = await axios.put("/api/bookmark", JSON.stringify(jobId));
    return res.data;
  };

  const { mutateAsync, isError, error } = useMutation(bookmarkAJobRequest, {
    onSuccess: () => {
      queryClient.refetchQueries("getUserSavedJobs");
    },

    onError: (error: any) => {
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });

  const bookmarkAndUnbookmarkAJobFunction = async () => {
    await mutateAsync(jobId);
  };

  return { isError, error, bookmarkAndUnbookmarkAJobFunction };
};
