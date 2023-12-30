"use client";

import "../styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "@/components";
import { Sans } from "./font";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />

      <title>
        The Tern Hub - Discover Tech internship Opportunties and Junior Roles
      </title>
      <body>
        <main className={Sans.className}>
          <NextAuthProvider>
            <Provider store={store}>
              <ReactQueryProvider>
                {children}

                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  theme="colored"
                />
              </ReactQueryProvider>
            </Provider>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
