"use client";

import "@/styles/globals.css";
import { Footer, NavigationBar, Sidebar } from "@/containers";
import { useState } from "react";
import { UniversalModal } from "@/components";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebar = () => setSidebarIsOpen(true);

  const closeSidebar = () => setSidebarIsOpen(false);

  const { modalVisible } = useSelector((state: StateType) => state.modal);

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <NavigationBar openSidebar={openSidebar} />

      {modalVisible && <UniversalModal children={<div>AAAA</div>} />}

      <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={closeSidebar} />

      {children}

      <Footer />
    </main>
  );
}
