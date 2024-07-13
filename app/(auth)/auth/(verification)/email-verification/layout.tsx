import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify your email address to continue using TernHub.",
};

export default function EmailVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
