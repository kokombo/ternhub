"use client";

import "@/styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "@/components";
import { Sans } from "./font";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id="root">
      <head>
        <title>TheTernHub - Tech jobs and internships.</title>

        <meta charSet="utf-8" />

        <link
          rel="icon"
          href="/theternhub-logo.png"
          type="image/png"
          sizes="any"
        />
      </head>

      <body>
        <main className={Sans.className}>
          <NextAuthProvider>
            <Provider store={store}>
              <ReactQueryProvider>
                {children}

                <ToastContainer
                  autoClose={5000}
                  theme="colored"
                  className="toast_message"
                  position="top-right"
                />
              </ReactQueryProvider>
            </Provider>
          </NextAuthProvider>
        </main>
      </body>

      <GoogleAnalytics gaId="G-93C2BN5147" />
    </html>
  );
}
