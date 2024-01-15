import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TheTernHub - Search all jobs",
  description: "Tech internship opportunities and junior roles",
};

const JobsPageInSearchLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children} </>;
};

export default JobsPageInSearchLayout;
