"use client";

import { AdminSegmentNavbar } from "@/containers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminSegmentNavbar />
      {children}
    </div>
  );
}
