"use client";

import { ProtectRoute } from "@/components";
import "@/styles/globals.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectRoute>{children}</ProtectRoute>;
}
