"use client";

import { Loader } from "@/components";
import "@/styles/globals.css";
import { useSession } from "next-auth/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  return <>{children}</>;
}
