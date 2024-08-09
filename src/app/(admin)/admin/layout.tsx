"use client";

import { AdminSegmentNavbar } from "@/containers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AdminSegmentNavbar />
      {children}
    </main>
  );
}
