type Props = {
  heading: string;
  subheading: string;
};

const SectionHeading = (props: Props) => {
  return (
    <article className="flex flex-col text-center gap-5 text-textblack">
      <h2 className="text-2xl lg:text-[40px] lg:leading-[56px] tracking-[0.5%] ">
        {props.heading}
      </h2>

      <h3 className="max-w-[1240px] text-lg lg:text-2xl tracking-[1%] ">
        {props.subheading}
      </h3>
    </article>
  );
};

export default SectionHeading;
