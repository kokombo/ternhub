"use client";
import "../../styles/globals.css";
import { Footer, NavigationBar, Sidebar } from "@/containers";
import { NextAuthProvider, ReactQueryProvider } from "@/components";
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
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ReactQueryProvider>
            <main>
              <NavigationBar openSidebar={openSidebar} />
              {/* 
              <Sidebar
                sidebarIsOpen={sidebarIsOpen}
                closeSidebar={closeSidebar}
              /> */}

              {children}

              <Footer />
            </main>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
