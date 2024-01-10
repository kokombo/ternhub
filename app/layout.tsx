"use client";

import "@/styles/globals.css";
import { NextAuthProvider, ReactQueryProvider } from "@/components";
import { Sans } from "./font";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>
          The Tern Hub - Tech internship Opportunties and Junior Roles
        </title>

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
                />
              </ReactQueryProvider>
            </Provider>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
