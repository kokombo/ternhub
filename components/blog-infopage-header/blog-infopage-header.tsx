import Image from "next/image";
import { readingTime } from "reading-time-estimator";

const BlogInfopageHeader = ({ props }: { props: BlogType | undefined }) => {
  return (
    <section className="bloginfopage_header_container">
      <Image
        src={props?.image as string}
        alt={props?.title as string}
        height={400}
        width={100}
        layout="responsive"
        loading="eager"
        priority={true}
        placeholder="blur"
        style={{ objectFit: "contain" }}
        className="h-[323px] md:w-full sm:h-[400px] object-contain rounded-[10px]"
      />

      <article className="flex justify-between gap-3 items-center w-full mt-5 lg:mt-[50px] lg:px-[45px] text-sm lg:text-2xl tracking-[1%] font-[400]">
        <p className="text-lightGrey">
          By <span className="text-textblack ">{props?.author}</span>
        </p>

        <article className="text-lightGrey text-sm">|</article>

        {props?.createdAt && (
          <p className="text-lightGrey">
            {new Date(props.createdAt).toLocaleDateString()}
          </p>
        )}

        {props?.content && (
          <p className="text-lightGrey">
            {readingTime(props.content, 238).text}
          </p>
        )}
      </article>

      <div className="border-grey border-[0.01px] w-full mt-[25px]"></div>
    </section>
  );
};

export default BlogInfopageHeader;
