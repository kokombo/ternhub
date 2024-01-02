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
        <section className="flex_center w-full lg:w-[820px]">
          <div className="h-[353px] lg:w-[600px] w-full relative block rounded-[10px]">
            <Image
              src={blog.image}
              alt={blog.title}
              loading="eager"
              quality={100}
              fill
              priority
              className="rounded-[10px] object-fill"
            />
          </div>

          <article className="flex justify-between gap-3 items-center w-full mt-5 lg:mt-[50px] lg:px-[45px] text-sm lg:text-2xl tracking-[1%] font-[400] ">
            <p className="text-lightGrey">
              By <span className="text-textblack ">{blog.author.name}</span>
            </p>

            <article className="text-lightGrey text-sm">|</article>

            <p className="text-lightGrey">
              {new Date(blog.createdAt).toDateString()}
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
