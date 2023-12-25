import {
  ApplyToJobButton,
  JobCompanyLogo,
  JobPostDuration,
  SaveAJob,
} from "..";
import { icons } from "../../constants";
import Image from "next/image";

const JobInfopageHeader = ({ props }: { props: JobType | undefined }) => {
  return (
    <section className="flex_center justify-center gap-5">
      <article className="flex items-center gap-4">
        <JobCompanyLogo props={props} />

        <p className="text-xl lg:text-2xl tracking-[1%] font-[400] ">
          {props?.company}
        </p>
      </article>

      <h2 className="text-[22px] lg:text-[28px] font-[600] tracking-[1%] text-center">
        {props?.title}
      </h2>

      <article className="flex items-center gap-4 lg:gap-5 lg:text-base text-[14px] font-[400] tracking-[1%] ">
        <article className="flex items-center gap-1">
          <Image
            src={icons.location}
            alt="location icon"
            height={24}
            width={24}
          />

          <p className="text-lightGrey capitalize ">{props?.location} </p>
        </article>

        <p className="text-lightGrey capitalize">{props?.mode} </p>

        <JobPostDuration props={props} />
      </article>

      <div className="flex items-center gap-[14px]">
        <ApplyToJobButton props={props} />

        {/* <SaveAJob props={props} /> */}
      </div>
    </section>
  );
};

export default JobInfopageHeader;
