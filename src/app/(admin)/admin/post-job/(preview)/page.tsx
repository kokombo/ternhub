import { JobInfopage } from "@/containers";
import Link from "next/link";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { SubmitFormLoader } from "@/components";

//This is hidden for now till we find a way around using preview mode with App Router

const PreviewJobBeforePublish = ({ data }: { data: JobType }) => {
  const router = useRouter();

  const disablePreviewMode = () => {
    return axios.post("/api/disable-preview");
  };

  const publishJobRequest = async (data: JobType) => {
    return await axios.post("/api/job", data);
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
    publishJobRequest,
    {
      onSuccess: () => {
        disablePreviewMode();

        router.push("/admin");
      },
    }
  );

  const publishJob = async () => await mutateAsync(data);

  return (
    <div>
      <JobInfopage data={data} />

      <div>
        <Link
          href="/admin/post-job/edit"
          className="form_submit_button"
          prefetch={false}
        >
          Edit Draft
        </Link>

        {isLoading ? (
          <SubmitFormLoader />
        ) : (
          <button
            type="button"
            onClick={publishJob}
            className="form_submit_button"
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewJobBeforePublish;
