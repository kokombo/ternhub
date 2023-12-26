import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

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
  });

  const bookmarkAndUnbookmarkAJobFunction = async () => {
    await mutateAsync(jobId);
  };

  return { isError, error, bookmarkAndUnbookmarkAJobFunction };
};
