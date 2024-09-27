import { JobInfopage } from "@/containers";
import { AdminToolBox } from "@/components";

const AdminJobInfoPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const jobId = searchParams.listing_id 

  return (
    <div className="py-11 sm:px-[6.94%] px-5 flex flex-col gap-4">
      <div className="flex flex-start">
        <AdminToolBox
          editButtonLabel="Edit Job"
          editButtonUrl={`/admin/jobs/job/edit?listing_id=${jobId}`}
          deleteButtonLabel="Delete Job"
          deleteButtonOnclick={() => {}}
        />
      </div>

      <JobInfopage jobId={jobId} />
    </div>
  );
};

export default AdminJobInfoPage;
