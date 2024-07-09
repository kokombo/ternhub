import { useSession } from "next-auth/react";

const EmailVerificationSegmentNavbar = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <div />;

  return (
    <nav className="nav_container">
      <p className="text-[20px] lg:text-[32px] text-purple">TheTernHub</p>

      <div className="h-12 w-12 rounded-full bg-purple flex items-center justify-center">
        <p className="text-2xl text-white uppercase">
          {session?.user?.name?.substring(0, 1)}
        </p>
      </div>
    </nav>
  );
};

export default EmailVerificationSegmentNavbar;
