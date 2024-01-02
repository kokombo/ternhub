"use client";

import "@/styles/globals.css";
import { JobsListPageHeader } from "@/containers";
import { Loader, JobsPageNavigationLink } from "@/components";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const JobsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  const router = useRouter();

  const pathname = usePathname();

  const displaySharedLayout = Boolean(
    pathname === "/jobs" || pathname === "/jobs/saved-jobs"
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;

  if (status === "authenticated")
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
