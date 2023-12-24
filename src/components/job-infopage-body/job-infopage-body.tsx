import parse from "html-react-parser";
import { ApplyToJobButton } from "@/components";

const JobInfopageBody = ({ props }: { props: JobType | undefined }) => {
  return (
    <section className="flex flex-col gap-6 lg:gap-9 items-start">
      <h1 className="font-grotesk text-[22px] lg:text-[28px] font-[400] tracking-[0.5%]">
        Job Description
      </h1>

      {props?.description && (
        <span className="font-sans text-base lg:text-lg font-[400] text-greyblack">
          {parse(props.description)}
        </span>
      )}

      <ApplyToJobButton props={props} />
    </section>
  );
};

export default JobInfopageBody;
