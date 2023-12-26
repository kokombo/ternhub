import parse from "html-react-parser";
import { Grotesk } from "@/app/font";

const BlogInfopageBody = ({ props: job }: { props: BlogType | undefined }) => {
  return (
    <>
      {job && (
        <section className="flex flex-col lg:gap-[50px] gap-6">
          <h1 className="text-2xl lg:text-[40px]" style={Grotesk.style}>
            {job.title}
          </h1>

          <span>{parse(job.content)}</span>
        </section>
      )}
    </>
  );
};

export default BlogInfopageBody;
