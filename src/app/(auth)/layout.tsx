"use client";

import "../../styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "@/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
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
