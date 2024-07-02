"use client";

import { NextAuthProvider, ReactQueryProvider } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/redux-toolkit/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthProvider>
      <Provider store={store}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Provider>
    </NextAuthProvider>
  );
};

export default Providers;
