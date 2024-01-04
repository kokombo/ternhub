"use client";

import "@/styles/globals.css";
import { EmailVerificationSegmentNavbar } from "@/components";

export default function EmailVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmailVerificationSegmentNavbar />

      {children}
    </>
  );
}
