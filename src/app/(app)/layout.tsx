"use client";
import type { Metadata } from "next";
import "../../styles/globals.css";

import { Footer, NavigationBar } from "@/containers";
import { Provider } from "@/components";
import { QueryClient, QueryClientProvider } from "react-query";

// export const metadata: Metadata = {
//   title: "TheTernHub",
//   description: "Discover amazing tech internship opportunities",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <main>
              <NavigationBar />
              {children}
              <Footer />
            </main>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
