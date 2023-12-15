"use client";

import "../../styles/globals.css";
import { Provider } from "@/components";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <main>{children}</main>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
