import Link from "next/link";
import { usePathname } from "next/navigation";

const JobsPageNavigationLink = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-[25px] ">
      <span className="relative max-w-fit">
        <Link href="/jobs" className="job_tab_link">
          Browse all jobs
        </Link>

        {pathname === "/jobs" && (
          <div className="bg-purple h-1 w-full absolute top-8"></div>
        )}
      </span>

      <span className="relative max-w-fit">
        <Link href="/jobs/saved-jobs" className="job_tab_link">
          Saved jobs
        </Link>

        {pathname === "/jobs/saved-jobs" && (
          <div className="bg-purple h-1 w-full absolute top-8"></div>
        )}
      </span>
    </div>
  );
};

export default JobsPageNavigationLink;
