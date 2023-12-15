const HeroTitle = () => {
  return (
    <article className="flex flex-col items-center text-center gap-6 2xl:px-[11%] text-textblack">
      <h1 className="capitalize font-grotesk lg:text-[68px] lg:leading-[82px] text-[34px] leading-[42px] tracking-[0.5%] ">
        Find your <span className="text-purple">dream internships </span>&
        kickstart your<span className="text-purple"> tech career.</span>
      </h1>

      <h3 className="text-lg lg:text-2xl tracking-[1%] max-w-[1098px]">
        Discover exciting tech internship opportunities and junior roles to take
        the first step towards a successful career.
      </h3>
    </article>
  );
};

export default HeroTitle;
