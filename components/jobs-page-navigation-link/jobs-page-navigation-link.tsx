import Link from "next/link";
import { usePathname } from "next/navigation";

const JobsPageNavigationLink = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-[25px] ">
      <li>
        <span className="relative max-w-fit">
          <Link href="/jobs" className="job_tab_link text-greyblack">
            Browse all jobs
          </Link>

          {pathname === "/jobs" && (
            <div className="bg-purple h-[1px] w-full absolute lg:top-[30px] top-[28px]" />
          )}
        </span>
      </li>

      <li>
        <span className="relative max-w-fit">
          <Link href="/jobs/saved-jobs" className="job_tab_link text-greyblack">
            Saved jobs
          </Link>

          {pathname === "/jobs/saved-jobs" && (
            <div className="bg-purple h-[1px] w-full absolute lg:top-[30px] top-[28px]" />
          )}
        </span>
      </li>
    </ul>
  );
};

export default JobsPageNavigationLink;
