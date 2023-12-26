"use client";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { bookmarkAJob } from "@/utilities/data-fetching/bookmarkAJob";

const SaveAJob = ({ job }: { job: JobType }) => {
  const { data: session } = useSession();

  const { userSavedJobs } = useSelector((store: StateType) => store.job);

  const { bookmarkAndUnbookmarkAJobFunction, error, isError } = bookmarkAJob(
    job._id
  );

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
