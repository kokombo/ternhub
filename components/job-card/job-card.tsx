import Image from "next/image";
import { icons } from "@/constants";
import { SaveAJob, JobCompanyLogo, JobPostDuration } from "..";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sendEmailVerificationLink } from "@/utilities/auth/sendEmailVerificationLink";

const JobCard = ({
  props: job,
  rootUrl,
}: {
  props: JobType;
  rootUrl: string;
}) => {
  const { data: session } = useSession();

  const router = useRouter();

  const viewJobDetails = () => {
    if (!session?.user) {
      router.push("/auth/signin");

      toast.error("Please sign in to continue using TheTernHub.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!session?.user?.emailVerified) {
      sendEmailVerificationLink(session?.user?.email!);

      toast.info("Please verify your email adress.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      router.push(`${rootUrl}/job?listing_id=${job._id}`);
    }
  };

  return (
    <article className="w-full border-grey gap-[18px] border-[0.8px] h-[212px] p-5 rounded-[10px] flex flex-col justify-between">
      <div className="flex gap-3 ">
        <JobCompanyLogo props={job} />

        <article className="capitalize tracking-[1%] flex_start gap-1">
          <p className="text-sm lg:text-base text-greyblack">{job.company}</p>

          <p className="text-base lg:text-lg font-semibold text-textblack">
            {job.title}
          </p>
        </article>
      </div>

      <div className="flex items-center gap-5 capitalize text-sm lg:text-base">
        <article className="flex gap-1 items-center">
          <Image
            src={icons.location}
            alt="location icon"
            height={24}
            width={24}
          />

          <p className=" text-lightGrey">{job.location}</p>
        </article>

        <p className="text-lightGrey">{job.mode}</p>
      </div>

      <div className="flex items-center justify-between">
        <JobPostDuration createdAt={job.createdAt} color="text-green" />

        <div className="flex gap-[14px] ">
          <button
            type="button"
            onClick={viewJobDetails}
            aria-label="button to view a job details"
            className="apply_button"
          >
            View
          </button>

          <SaveAJob props={job} />
        </div>
      </div>
    </article>
  );
};

export default JobCard;
