import Image from "next/image";
import Link from "next/link";
import { BlogReadTime } from "..";
import { BsArrowRight } from "react-icons/bs";

const BlogCard = ({
  props: job,
  rootUrl,
}: {
  props: BlogType;
  rootUrl: string;
}) => {
  const postCreationDate = new Date(job.createdAt).toDateString();

  return (
    <article className="max-w-[400px] sm:max-w-[295px] border-grey border-[0.8px] rounded-[10px]">
      <div className="h-[255px] w-full bg-grey  rounded-t-[10px]">
        <Image
          src={job.image}
          alt={job.title}
          width={100}
          height={100}
          quality={100}
          className="rounded-t-[10px] h-full w-full"
          loading="lazy"
        />
      </div>

      <div className=" lg:h-[300px] p-[10px] flex_start gap-2">
        <p className="text-purple text-base font-normal">{job.category}</p>

        <h4 className="text-[22px] h-16 lg:text-2xl tracking-[1%] font-semibold capitalize flex-wrap overflow-hidden">
          {job.title}
        </h4>

        <p className="text-sm capitalize">
          <span className="text-lightGrey">By </span>
          {job.author}
        </p>

        <article className="flex justify-center gap-1">
          <p className="text-sm text-lightGrey tracking-[1%]">
            {postCreationDate}
          </p>

          <span className="text-sm text-lightGrey">|</span>

          <BlogReadTime props={job} className="text-sm" />
        </article>

        <p className="text-sm lg:text-base tracking-[1%] my-1 lg:h-[84px] h-[44px] flex-wrap overflow-hidden font-normal">
          {job.metaDescription}...
        </p>

        <div className="flex items-center gap-[9px] text-green hover:text-deepgreen ">
          <Link
            href={`${rootUrl}/${job.slug}`}
            aria-label="link to read blog"
            className="text-base font-semibold"
          >
            Read more
          </Link>

          <span className="text-2xl">
            <BsArrowRight />
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
