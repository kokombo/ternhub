import Image from "next/image";

const BlogInfopageHeader = ({ props }: { props: BlogType | undefined }) => {
  return (
    <section className="flex_center w-full lg:w-[820px] ">
      <div className=" h-[323px] md:w-full sm:h-[400px] ">
        <Image
          src={props?.image as string}
          alt={props?.title as string}
          height={100}
          width={100}
          className="w-full h-full rounded-[10px]"
        />
      </div>

      <article className="flex justify-between gap-3 items-center w-full mt-5 lg:mt-[50px] lg:px-[45px] text-sm lg:text-2xl tracking-[1%] font-[400]">
        <p className="text-lightGrey">
          By <span className="text-textblack ">{props?.author}</span>
        </p>

        <article className="text-lightGrey text-sm">|</article>

        {/* <p className="text-lightGrey">{props.timeStamp}</p> */}

        {/* <p className="text-lightGrey">
              {readingTime(props.content, 238).text}
            </p> */}
      </article>

      <div className="border-grey border-[0.01px] w-full mt-[25px]"></div>
    </section>
  );
};

export default BlogInfopageHeader;
