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

  const { data: session } = useSession({ required: true });

  useEffect(() => {
    if (session?.user.role !== "admin") router.push("/");
  }, [session?.user, router]);

  if (session?.user.role === "admin")
    return (
      <section>
        <AdminSegmentNavbar />

        {children}
      </section>
    );
}
