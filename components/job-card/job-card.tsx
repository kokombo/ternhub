"use client";

import Link from "next/link";
import Image from "next/image";
import { icons } from "@/constants";
import { SaveAJob, JobCompanyLogo, JobPostDuration } from "..";
import { useSession } from "next-auth/react";

const JobCard = ({
  props: job,
  rootUrl,
}: {
  props: JobType;
  rootUrl: string;
}) => {
  const { data: session } = useSession();

  return (
    <article className="w-full border-grey gap-[18px] border-[0.8px] h-[212px] p-5 rounded-[10px] flex flex-col justify-between">
      <div className="flex gap-3 ">
        <JobCompanyLogo props={job} />

        <article className="capitalize tracking-[1%] flex_start gap-1">
          <p className="text-sm lg:text-base text-greyblack">{job.company}</p>

          <p className="text-base lg:text-lg font-[800]">{job.title}</p>
        </article>
      </div>

      <div className="flex items-center gap-5 capitalize text-sm lg:text-base">
        <article className="flex gap-1 items-center">
          <Image src={icons.location} alt="location icon" className="h-6 w-6" />

          <p className=" text-lightGrey">{job.location}</p>
        </article>

        <p className="text-lightGrey">{job.mode}</p>
      </div>

      <div className="flex items-center justify-between">
        <JobPostDuration createdAt={job.createdAt} color="text-green" />

        <div className="flex gap-[14px] ">
          <Link
            href={` ${
              session?.user ? `${rootUrl}/${job._id}` : "/auth/signin"
            }`}
            aria-label="link to a job details"
            className="apply_button"
          >
            Apply
          </Link>

          <SaveAJob props={job} />
        </div>
      </div>
    </article>
  );
};

export default JobCard;
