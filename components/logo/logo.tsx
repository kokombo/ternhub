import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useCurrentClientSession } from "@/utilities/auth/useCurrentClientSession";

const Logo = () => {
  const { session, sessionLoading } = useCurrentClientSession();
  return (
    <Link
      href={session?.user ? "/jobs" : "/"}
      className={twMerge("text-[20px] lg:text-[32px] text-purple")}
      aria-disabled={!!sessionLoading}
    >
      TheTernHub
    </Link>
  );
};

export default Logo;
