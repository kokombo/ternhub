import parse from "html-react-parser";
import { ApplyToJobButton } from "..";

const JobInfopageBody = ({ props: job }: { props: JobType | undefined }) => {
  return (
    <>
      {job && (
        <section className="flex flex-col gap-6 lg:gap-9 items-start">
          <h1 className="font-grotesk text-[22px] lg:text-[28px] font-[400] tracking-[0.5%]">
            Job Description
          </h1>

          <span className="font-sans text-base lg:text-lg font-[400] text-greyblack">
            {parse(job.description)}
          </span>

          <ApplyToJobButton props={job} />
        </section>
      )}
    </>
  );
};

export default JobInfopageBody;
