import Image from "next/image";
import { readingTime } from "reading-time-estimator";

const BlogInfopageHeader = ({
  props: blog,
}: {
  props: BlogType | undefined;
}) => {
  return (
    <>
      {blog && (
        <section className="flex flex-col items-center w-full lg:w-[820px]">
          <Image
            src={blog.image}
            alt={blog.title}
            height={100}
            width={100}
            layout="responsive"
            loading="eager"
            priority={true}
            className="rounded-[10px] lg:h-[400px] lg:w-[600px] md:w-full md:h-[323px]"
          />

          <article className="flex justify-between gap-3 items-center w-full mt-5 lg:mt-[50px] lg:px-[45px] text-sm lg:text-2xl tracking-[1%] font-[400]">
            <p className="text-lightGrey">
              By <span className="text-textblack ">{blog.author}</span>
            </p>

            <article className="text-lightGrey text-sm">|</article>

            <p className="text-lightGrey">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <p className="text-lightGrey">
              {readingTime(blog.content, 238).text}
            </p>
          </article>

          <div className="border-grey border-[0.01px] w-full mt-[25px]"></div>
        </section>
      )}
    </>
  );
};

export default BlogInfopageHeader;
