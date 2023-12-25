"use client";
import "../../../styles/globals.css";
import { useSession } from "next-auth/react";
import { Loader } from "../../../components";
const BlogsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") return <Loader />;

  return <>{children} </>;
};

export default BlogsPageLayout;
