import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";

const Logo = () => {
  const { data: session, status } = useSession();

  return (
    <Link
      href={session ? "/jobs" : "/"}
      className={twMerge("text-[20px] lg:text-[32px] text-purple")}
      aria-disabled={status === "loading"}
    >
      TheTernHub
    </Link>
  );
};

export default Logo;
