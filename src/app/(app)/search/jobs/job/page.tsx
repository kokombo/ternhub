import { JobInfopage } from "@/containers";

const JobPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const jobId = searchParams.listing_id;

  return (
    <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5">
      <JobInfopage jobId={jobId} />
    </div>
  );
};

export default JobPage;
