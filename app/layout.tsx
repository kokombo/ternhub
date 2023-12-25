"use client";

import "../styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "../components";
import { Grotesk, Sans } from "./font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main className={Sans.className}>
          <NextAuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
