import { GroteskNormal } from "@/app/font";

const BlogsListpageTitle = () => {
  return (
    <h1
      className="capitalize lg:text-[68px] lg:leading-[82px] text-[34px] leading-[42px] tracking-[0.5%]"
      style={GroteskNormal.style}
    >
      Expand your <span className="text-purple">knowledge </span>with these{" "}
      <span className="text-purple">engaging</span> blog posts
    </h1>
  );
};

export default BlogsListpageTitle;
