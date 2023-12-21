import { GetServerSideProps } from "next";
import { JobInfopage } from "@/containers";
import Link from "next/link";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { SubmitFormLoader } from "@/components";

const PreviewJobBeforePublish = ({ data }: { data: JobType }) => {
  const router = useRouter();

  const disablePreviewMode = () => {
    return axios.post("/api/disable-preview");
  };

  const publishJobRequest = async (data: JobType) => {
    return await axios.post("/api/job", data);
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation(publishJobRequest);

  const publishJob = async () => {
    await mutateAsync(data);

    if (isSuccess) {
      disablePreviewMode();

      router.push("/admin");
    }
  };

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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       data: context.previewData,
//     },
//   };
// };
