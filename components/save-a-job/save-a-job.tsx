import { useSession } from "next-auth/react";
import { useBookmarkAJob } from "@/utilities/data-fetching/bookmarkAJob";
import { useSelector } from "react-redux";
import type { StateType } from "@/redux-toolkit/store";
import { useGetUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";

const SaveAJob = ({ props: job }: { props: JobType }) => {
  const { data: session } = useSession();

  const { userSavedJobs } = useSelector((state: StateType) => state.job);

  useGetUserSavedJobs();

  const { bookmarkAndUnbookmarkAJobFunction } = useBookmarkAJob(job._id);

  const alreadyBookmarkedJobsIds = userSavedJobs?.map((eachJob) => eachJob._id);

  return (
    <button
      type="button"
      aria-label="button to save or bookmark a job"
      className="save_button"
      onClick={bookmarkAndUnbookmarkAJobFunction}
    >
      {!session?.user || !alreadyBookmarkedJobsIds?.includes(job._id)
        ? "Save"
        : "Remove"}
    </button>
  );
};

export default SaveAJob;
