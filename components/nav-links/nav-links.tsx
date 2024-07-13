"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const NavLinks = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <ul className="flex flex-col md:flex-row items-center gap-[38px]">
      <li>
        <Link
          href={`${
            status === "authenticated"
              ? "/jobs"
              : status === "unauthenticated"
              ? "/auth/signin"
              : "#"
          }`}
          aria-label="internships page link"
          className={twMerge(
            pathname.includes("/jobs") && "text-purple",
            "text-sm lg:text-base tracking-[0.5%]",
            status === "loading" && "pointer-events-none"
          )}
          onClick={() => {
            session
              ? undefined
              : toast.error("Please sign in to continue using TernHub.");
          }}
        >
          Jobs
        </Link>
      </li>

      <li>
        <Link
          href={status === "loading" ? "#" : "/blogs"}
          aria-label="blogs page link"
          className={twMerge(
            pathname.includes("/blogs") && "text-purple",
            "text-sm lg:text-base tracking-[0.5%]",
            status === "loading" && "pointer-events-none"
          )}
        >
          Blogs
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
