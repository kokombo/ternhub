import {
  ApplyToJobButton,
  JobCompanyLogo,
  JobPostDuration,
  SaveAJob,
} from "..";
import { icons } from "@/constants";
import Image from "next/image";

const JobInfopageHeader = ({ props: job }: { props: JobType | undefined }) => {
  return (
    <>
      {job && (
        <section className="flex_center justify-center gap-5">
          <article className="flex items-center gap-4">
            <JobCompanyLogo props={job} />

            <p className="text-xl lg:text-2xl tracking-[1%] font-[400] text-center">
              {job.company}
            </p>
          </article>

          <h2 className="text-[22px] lg:text-[28px] font-[600] tracking-[1%] text-center">
            {job.title}
          </h2>

          <article className="flex items-center gap-4 lg:gap-5 lg:text-base text-[14px] font-[400] tracking-[1%] ">
            <article className="flex items-center gap-1">
              <Image
                src={icons.location}
                alt="location icon"
                height={24}
                width={24}
              />

              <p className="text-lightGrey capitalize ">{job.location} </p>
            </article>

            <p className="text-lightGrey capitalize">{job.mode} </p>

            <JobPostDuration createdAt={job.createdAt} color="text-green" />
          </article>

          <div className="flex items-center gap-[14px]">
            <ApplyToJobButton props={job} />

            <SaveAJob props={job} />
          </div>
        </section>
      )}
    </>
  );
};

export default JobInfopageHeader;
