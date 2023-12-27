import Link from "next/link";
import { useSession } from "next-auth/react";

const Logo = () => {
  const { data: session } = useSession();

  return (
    <Link
      href={session?.user ? "/jobs" : "/"}
      className="text-[20px] lg:text-[32px] text-purple"
      prefetch={false}
    >
      TheTernHub
    </Link>
  );
};

export default Logo;
