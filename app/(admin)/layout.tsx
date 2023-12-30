"use client";

import "@/styles/globals.css";
import { AdminSegmentNavbar } from "@/containers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session?.user && session?.user.role !== "admin")
    )
      router.push("/");
  }, [status, session?.user, router]);

  if (status === "authenticated" && session?.user.role == "admin")
    return (
      <section>
        <AdminSegmentNavbar />

        {children}
      </section>
    );
}
