"use client";
import { JobsListPageHeader } from "@/containers";
import { JobsPageNavigationLink } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const JobsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.replace("/");
    }
  }, [status]);

  if (status === "authenticated")
    return (
      <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5 flex flex-col gap-[44px] md:gap-[64px]">
        <JobsListPageHeader />

        <JobsPageNavigationLink />

        {children}
      </div>
    );
};

export default JobsPageLayout;
