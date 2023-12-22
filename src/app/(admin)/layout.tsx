"use client";

import "../../styles/globals.css";
import { AdminSegmentNavbar } from "@/containers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //If there is no session.user, redirect to /. if there is session.user but not an admin, redirect to "/jobs"

  return (
    <section>
      <AdminSegmentNavbar />

      {children}
    </section>
  );
}
