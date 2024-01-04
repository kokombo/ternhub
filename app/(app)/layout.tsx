"use client";

import "@/styles/globals.css";
import { Footer, NavigationBar, Sidebar } from "@/containers";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebar = () => setSidebarIsOpen(true);

  const closeSidebar = () => setSidebarIsOpen(false);

  if (status === "loading") return <Loader />;

  return (
    <div className="flex flex-col justify-between">
      <NavigationBar openSidebar={openSidebar} />

      <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={closeSidebar} />

      <div className="min-h-screen">{children}</div>

      <Footer />
    </div>
  );
}
