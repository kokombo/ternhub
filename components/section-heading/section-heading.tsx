import { Grotesk } from "@/app/font";

type Props = {
  heading: string;
  subheading: string;
};

const SectionHeading = (props: Props) => {
  return (
    <article className="flex flex-col text-center lg:gap-5 gap-[18px] ">
      <h2
        className="text-2xl lg:text-[40px] lg:leading-[56px] tracking-[0.5%] text-textblack"
        style={Grotesk.style}
      >
        {props.heading}
      </h2>

      <p className="max-w-[1240px] text-lg lg:text-2xl tracking-[1%] text-greyblack">
        {props.subheading}
      </p>
    </article>
  );
};

export default SectionHeading;
