import "@/styles/globals.css";
import { Sans } from "./font";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "./(components)";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TheTernHub",
  description: "Discover new internship opportunities",
  icons: {
    icon: "/theternhub-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id="root" suppressHydrationWarning>
      <body>
        <main className={Sans.className}>
          <Providers>
            {children}

            <ToastContainer
              autoClose={5000}
              theme="colored"
              className="toast_message"
              position="top-right"
            />
          </Providers>
        </main>
      </body>

      <GoogleAnalytics gaId="G-93C2BN5147" />
    </html>
  );
}
