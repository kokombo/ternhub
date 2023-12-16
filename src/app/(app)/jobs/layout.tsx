"use client";
import { useSession } from "next-auth/react";
import { JobsPageHeader } from "@/containers";
import { JobsPageNavigationLink } from "@/components";

const JobsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  return (
    <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5 flex flex-col gap-[44px] md:gap-[64px]">
      <JobsPageHeader />

      <JobsPageNavigationLink />

      {children}
    </div>
  );
};

export default JobsPageLayout;
