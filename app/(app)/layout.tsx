"use client";

import "../../styles/globals.css";
import { Footer, NavigationBar, Sidebar } from "../../containers";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebar = () => setSidebarIsOpen(true);

  const closeSidebar = () => setSidebarIsOpen(false);

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <NavigationBar openSidebar={openSidebar} />

      <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={closeSidebar} />

      {children}

      <Footer />
    </main>
  );
}
