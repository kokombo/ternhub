import { JobInfopage } from "@/containers";

const JobPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const jobId = searchParams.listing_id;

  return <JobInfopage jobId={jobId} />;
};

export default JobPage;
