const BlogInfopageBody = ({ props }: { props: BlogType | undefined }) => {
  return (
    <section className="py-10 lg:py-[50px] pb-[50px] lg:pb-[100px]">
      <h1 className="mb-6 lg:mb-[50px] text-2xl lg:text-[40px] ">
        {props?.title}
      </h1>

      {/* {props.content && <span>{HTMLReactParser(props.content)}</span>} */}
    </section>
  );
};

export default BlogInfopageBody;
