"use client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";

const SaveAJob = ({ props: job }: { props: JobType }) => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const bookmarkAJobRequest = async (
    jobId: string
  ): Promise<JobType[] | undefined> => {
    return await axios.put("/api/bookmark", jobId);
  };

  const {
    mutate,
    data: userSavedJobs,
    isError,
    error,
  } = useMutation(bookmarkAJobRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("getUserSavedJobs");
    },
  });

  const bookmarkAndUnbookmarkAJob = () => {
    mutate(job.id);
  };

  const alreadyBookmarkedJobsIds = userSavedJobs?.map((job) => job.id);

  return (
    <button
      type="button"
      aria-label="button to save or bookmark a job"
      className="save_button"
      onClick={bookmarkAndUnbookmarkAJob}
    >
      {!session?.user || !alreadyBookmarkedJobsIds?.includes(job.id)
        ? "Save"
        : "Remove"}
    </button>
  );
};

export default SaveAJob;
