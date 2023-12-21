"use client";
import { JobsListPageHeader } from "@/containers";
import { JobsPageNavigationLink } from "@/components";

const JobsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5 flex flex-col gap-[44px] md:gap-[64px]">
      <JobsListPageHeader />

      <JobsPageNavigationLink />

      {children}
    </div>
  );
};

export default JobsPageLayout;
