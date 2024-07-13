"use client";

import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) => {
  const client = new QueryClient();

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
