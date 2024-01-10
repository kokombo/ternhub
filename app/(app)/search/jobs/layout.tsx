import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Latest tech Jobs",
  description: "Discover latest tech internship opportunities and junior roles",
};

const JobsPageInSearchLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children} </>;
};

export default JobsPageInSearchLayout;
