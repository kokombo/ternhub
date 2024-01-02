import Link from "next/link";
import { BlogReadTime, JobPostDuration } from "..";
import Image from "next/image";
import { GroteskNormal } from "@/app/font";
import { useRouter } from "next/navigation";

const RecentBlogCard = ({
  props: blog,
  rootUrl,
}: {
  props: BlogType;
  rootUrl: string;
}) => {
  const router = useRouter();

  return (
    <article
      key={blog._id}
      className="flex md:flex-row flex-col md:items-center items-start gap-4"
    >
      <div className="h-[388px] lg:w-[564px] w-full rounded-l-[10px] bg-grey relative block">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          loading="lazy"
          quality={100}
          className="lg:rounded-l-[10px]"
        />
      </div>

      <div>
        <article>
          <h1
            className="text-[30px] lg:text-[40px] tracking-[0.5%] font-normal text-textblack max-w-[617px]"
            style={GroteskNormal.style}
          >
            {blog.title}
          </h1>
        </article>

        <article className="flex items-center lg:gap-[46px] gap-1 lg:text-2xl text-base my-6">
          <p>
            <span className="text-lightGrey">By</span> {blog.author.name}
          </p>
          <p className="text-sm text-lightGrey">|</p>

          <span className="text-lightGrey">
            <JobPostDuration createdAt={blog.createdAt} color="text-greytext" />
          </span>
        </article>

        <article className="my-8">
          <button
            type="button"
            onClick={() => router.push(`${rootUrl}/${blog.slug}`)}
            className="px-8 py-3 bg-purple hover:bg-blue rounded-[10px] text-white text-base font-semibold"
          >
            Read more
          </button>
        </article>

        <div className="border-grey border-[0.01px] w-full"></div>

        <article className=" mt-8">
          <BlogReadTime props={blog} className={"text-lg"} />
        </article>
      </div>
    </article>
  );
};

export default RecentBlogCard;
