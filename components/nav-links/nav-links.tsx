"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NavLinks = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <ul className="flex flex-col md:flex-row items-center gap-[38px]">
      <li>
        <Link
          href={`${session?.user ? "/jobs" : "/auth/signin"}`}
          aria-label="internships page link"
          className={`${
            pathname.includes("/jobs") ? "text-purple" : ""
          } text-sm lg:text-base tracking-[0.5%]`}
          prefetch={false}
        >
          Jobs
        </Link>
      </li>

      <li>
        <Link
          href={"/blogs"}
          aria-label="blogs page link"
          className={`${
            pathname.includes("/blogs") ? "text-purple" : ""
          } text-sm lg:text-base tracking-[0.5%] font-sans `}
          prefetch={false}
        >
          Blogs
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
