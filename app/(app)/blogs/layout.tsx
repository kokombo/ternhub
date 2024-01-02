"use client";

import "@/styles/globals.css";
import { Loader } from "@/components";
import { useSession } from "next-auth/react";

const BlogsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  return <>{children} </>;
};

export default BlogsPageLayout;
