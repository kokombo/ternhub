import parse from "html-react-parser";
import { Grotesk } from "@/app/font";

const BlogInfopageBody = ({ props }: { props: BlogType | undefined }) => {
  return (
    <section className="flex flex-col lg:gap-[50px] gap-6">
      <h1 className="text-2xl lg:text-[40px]" style={Grotesk.style}>
        {props?.title}
      </h1>

      {props?.content && <span>{parse(props.content)}</span>}
    </section>
  );
};

export default BlogInfopageBody;
