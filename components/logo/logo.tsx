import Link from "next/link";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

type Props = {
  disabled?: boolean;
};

const Logo = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <Link
      href={session?.user ? "/jobs" : "/"}
      className={twMerge(
        "text-[20px] lg:text-[32px] text-purple",
        status === "loading" && "pointer-events-none"
      )}
      prefetch={false}
      aria-disabled={props.disabled}
    >
      TheTernHub
    </Link>
  );
};

export default Logo;
