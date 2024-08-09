"use client";

import { JobsListPageHeader } from "@/containers";
import { JobsPageNavigationLink } from "@/components";
import { usePathname } from "next/navigation";

const JobsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const displaySharedLayout = Boolean(
    pathname === "/jobs" || pathname === "/jobs/saved-jobs"
  );

  return (
    <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5 flex flex-col gap-6 md:gap-11">
      {displaySharedLayout && (
        <div className="flex flex-col gap-11 md:gap-16">
          <JobsListPageHeader />
          <JobsPageNavigationLink />
        </div>
      )}
      {children}
    </div>
  );
};

export default JobsPageLayout;
