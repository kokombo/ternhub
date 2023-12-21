import Link from "next/link";
import { BlogReadTime } from "..";
import Image from "next/image";

const RecentBlogCard = ({ props }: { props: BlogType }) => {
  return (
    <article
      key={props.id}
      className="flex md:flex-row flex-col md:items-center items-start gap-4"
    >
      <div className="h-[388px] lg:w-[564px] w-full rounded-l-[10px] bg-grey ">
        <Image
          src={props.image}
          alt={props.title}
          className="h-full w-full lg:rounded-l-[10px]"
        />
      </div>

      <div>
        <article>
          <h1 className="text-[30px] lg:text-[40px] tracking-[0.5%] font-normal text-textblack max-w-[617px]">
            {props.title}
          </h1>
        </article>

        <article className="flex items-center lg:gap-[46px] gap-1 lg:text-2xl text-base my-6">
          <p>
            <span className="text-lightGrey">By</span> {props.author}
          </p>
          <p className="text-sm text-lightGrey">|</p>

          <p className="text-lightGrey">{props.timeStamp.toLocaleString()}</p>
        </article>

        <article className="my-8">
          <Link
            href={`/blogs/${props.slug}`}
            className="px-8 py-3 bg-purple hover:bg-blue rounded-[10px] text-white text-base font-semibold"
          >
            Read more
          </Link>
        </article>

        <div className="border-grey border-[0.01px] w-full"></div>

        <article className=" mt-8">
          <BlogReadTime props={props} className={"text-lg"} />
        </article>
      </div>
    </article>
  );
};

export default RecentBlogCard;
