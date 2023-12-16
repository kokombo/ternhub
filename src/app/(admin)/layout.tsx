"use client";
import "../../styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "@/components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ReactQueryProvider>
            <main>{children}</main>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
