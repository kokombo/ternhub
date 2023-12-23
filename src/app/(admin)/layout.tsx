"use client";

import "../../styles/globals.css";
import { AdminSegmentNavbar } from "@/containers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session } = useSession();

  if (!session?.user || session?.user.role !== "admin") return router.push("/");

  return (
    <section>
      <AdminSegmentNavbar />

      {children}
    </section>
  );
}
