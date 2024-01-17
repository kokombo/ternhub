import { useSession } from "next-auth/react";
import { bookmarkAJob } from "@/utilities/data-fetching/bookmarkAJob";
import { getUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";

const SaveAJob = ({ props: job }: { props: JobType }) => {
  const { data: session } = useSession();

  const { savedJobs: userSavedJobs } = getUserSavedJobs();

  const { bookmarkAndUnbookmarkAJobFunction } = bookmarkAJob(job._id);

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
