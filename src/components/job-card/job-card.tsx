import Link from "next/link";
import Image from "next/image";
import { icons } from "@/constants";
import JobCompanyLogo from "../job-company-logo/job-company-logo";
import JobPostDuration from "../job-post-duration/job-post-duration";

const JobCard = ({ props }: { props: Job }) => {
  return (
    <article className="w-full border-grey gap-[18px] border-[0.8px] h-[212px] p-5 rounded-[10px] flex flex-col justify-between">
      <div className="flex gap-3 ">
        <JobCompanyLogo props={props} />

        <article className="capitalize tracking-[1%] flex_start gap-1">
          <p className="text-sm lg:text-base text-greyblack">{props.company}</p>

          <p className="text-base lg:text-lg font-semibold">{props.title}</p>
        </article>
      </div>

      <div className="flex items-center gap-5 capitalize text-sm lg:text-base">
        <article className="flex gap-1 items-center">
          <Image src={icons.location} alt="location icon" className="h-6 w-6" />

          <p className=" text-lightGrey">{props.location}</p>
        </article>

        <p className="text-lightGrey">{props.mode}</p>
      </div>

      <div className="flex items-center justify-between">
        <JobPostDuration props={props} />

        <div className="flex gap-[14px] ">
          <Link
            href={`/internship/${props.id}`}
            aria-label="link to a job details"
            className="apply_button"
          >
            Apply
          </Link>

          {/* <SaveAJob job={job} /> */}
        </div>
      </div>
    </article>
  );
};

export default JobCard;
