"use client";

import "@/styles/globals.css";
import { EmailVerificationSegmentNavbar } from "@/components";
import { useSession } from "next-auth/react";

export default function EmailVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") return <div className="h-screen"></div>;

  return (
    <>
      <EmailVerificationSegmentNavbar />

      {children}
    </>
  );
}
