import Image from "next/image";
import Link from "next/link";
import { BlogReadTime } from "..";

const BlogCard = ({ props, rootUrl }: { props: BlogType; rootUrl: string }) => {
  return (
    <article className="max-w-[400px] sm:max-w-[295px] border-grey border-[0.8px] rounded-[10px]">
      <div className="h-[300px] w-full bg-grey">
        <Image
          src={props.image}
          alt={props.title}
          className="h-full w-full rounded-t-[10px]"
          loading="lazy"
        />
      </div>

      <div className=" lg:h-[248px] p-5 flex_start gap-2">
        <p className="text-purple">{props.category}</p>

        <h4 className="text-[22px] h-16 leading-8 lg:text-2xl font-semibold tracking-[1%] capitalize">
          {props.title}
        </h4>

        <article className="flex justify-center gap-[4px]">
          <p>
            <span className="text-lightGrey">By</span>
            {props.author}
          </p>

          <span className="text-[10px] text-lightGrey">|</span>

          <p className="text-sm lg:text-base text-lightGrey tracking-[1%]">
            {props.timeStamp.toLocaleString()}
          </p>

          <span className="text-[10px] text-lightGrey">|</span>

          <BlogReadTime props={props} className="text-sm" />
        </article>

        <p className="text-sm lg:text-base tracking-[1%] my-1">
          {props.metaDescription}
        </p>

        <div className="flex items-center gap-[9px] text-green hover:text-deepgreen ">
          <Link
            href={`${rootUrl}/${props.id}`}
            aria-label="link to read blog"
            className="text-base font-semibold"
          >
            Read more
          </Link>

          <span className="text-2xl">{/* <BsArrowRight /> */}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
