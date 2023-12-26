"use client";

import "../styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "@/components";
import { Sans } from "./font";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";

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
            <Provider store={store}>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </Provider>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
