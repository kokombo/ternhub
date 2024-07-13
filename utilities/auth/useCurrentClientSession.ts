"use client";
import { useSession } from "next-auth/react";

export const useCurrentClientSession = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.user.accessToken;
  const sessionLoading = status === "loading";

  return {
    accessToken,
    session,
    sessionLoading,
  };
};
