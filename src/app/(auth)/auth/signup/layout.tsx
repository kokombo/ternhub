import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create your TernHub account.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
