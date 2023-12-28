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
          <div className="h-[323px] md:w-full sm:h-[400px]">
            <Image
              src={blog.image}
              alt={blog.title}
              height={100}
              width={100}
              loading="eager"
              priority
              style={{
                width: "inherit",
                height: "inherit",
              }}
              className="rounded-[10px] w-full h-full"
            />
          </div>

          <article className="flex justify-between gap-3 items-center w-full mt-5 lg:mt-[50px] lg:px-[45px] text-sm lg:text-2xl tracking-[1%] font-[400]">
            <p className="text-lightGrey">
              By <span className="text-textblack ">{blog.author}</span>
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
