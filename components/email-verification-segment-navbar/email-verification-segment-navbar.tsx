"use client";

import { ProfilePicture } from "@/components";
import { useSession } from "next-auth/react";

const EmailVerificationSegmentNavbar = () => {
  const { status } = useSession();

  if (status === "loading") return <div></div>;

  return (
    <nav className="nav_container">
      <p className="text-[20px] lg:text-[32px] text-purple">TheTernHub</p>

      <ProfilePicture />
    </nav>
  );
};

export default EmailVerificationSegmentNavbar;
