import Link from "next/link";
import React from "react";

const JobsPageNavigationLink = () => {
  return (
    <div className="flex items-center gap-[25px] ">
      <span className="relative max-w-fit">
        <Link href="/jobs" className="job_tab_link">
          Browse all jobs
        </Link>
      </span>

      <span className="relative max-w-fit">
        <Link href="/jobs/saved-jobs" className="job_tab_link">
          Saved jobs
        </Link>
      </span>
    </div>
  );
};

export default JobsPageNavigationLink;
