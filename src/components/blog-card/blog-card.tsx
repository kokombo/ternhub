"use client";
import Image from "next/image";
import { BlogReadTime } from "..";
import { BsArrowRight } from "react-icons/bs";
import { useGetBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";
import { useRouter } from "next/navigation";

const BlogCard = ({
  props: blog,
  rootUrl,
}: {
  props: BlogType;
  rootUrl: string;
}) => {
  const postCreationDate = new Date(blog.createdAt).toDateString();
  const { isLoading } = useGetBlogBySlug(blog.slug);
  const router = useRouter();

  const showBlogDetails = () => {
    if (!isLoading) {
      router.push(`${rootUrl}/${blog.slug}`);
    }
  };

  return (
    <article className="max-w-[400px] sm:max-w-[295px] border-grey border-[0.8px] rounded-[10px]">
      <div className="h-[300px] w-full bg-grey rounded-t-[10px] relative block">
        <Image
          src={blog.image}
          alt={blog.title}
          quality={100}
          fill
          className="rounded-t-[10px] object-fill"
          loading="lazy"
          sizes="any"
        />
      </div>

      <div className=" lg:h-[300px] p-[10px] flex_start gap-2">
        <p className="text-purple text-base font-normal">{blog.category}</p>

        <h4 className="text-[22px] h-16 leading-8 lg:text-2xl tracking-[1%] font-semibold capitalize flex-wrap overflow-hidden text-textblack">
          {blog.title}
        </h4>

        <p className="text-sm capitalize">
          <span className="text-lightGrey">By </span>
          {blog.author.name}
        </p>

        <article className="flex justify-center gap-1">
          <p className="text-sm text-lightGrey tracking-[1%]">
            {postCreationDate}
          </p>

          <span className="text-sm text-lightGrey">|</span>

          <BlogReadTime props={blog} className="text-sm" />
        </article>

        <p className="text-sm lg:text-base leading-[22px] lg:leading-7 tracking-[1%] my-1 lg:h-[84px] h-[44px] flex-wrap overflow-hidden font-normal text-greyblack">
          {blog.metaDescription}...
        </p>

        <div className="flex items-center gap-[9px] text-green hover:text-deepgreen ">
          <button
            type="button"
            onClick={showBlogDetails}
            aria-label="button to navigate to blog details page"
            className="text-base font-semibold"
          >
            Read more
          </button>

          <span className="text-2xl">
            <BsArrowRight />
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
