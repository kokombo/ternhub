import { BlogsList } from "@/containers";
import { GroteskNormal } from "@/app/font";

const BlogListPage = () => {
  return (
    <div className="flex flex-col py-11 lg:py-[100px] sm:px-[6.94%] px-5 w-full">
      <section className="blog_list_header_wrapper">
        <h1
          className="capitalize lg:text-[68px] lg:leading-[82px] text-[34px] leading-[42px] tracking-[0.5%]"
          style={GroteskNormal.style}
        >
          Expand your <span className="text-purple">knowledge </span>with these
          <span className="text-purple">engaging</span> blog posts
        </h1>
      </section>

      <BlogsList rootUrl="/blogs" />
    </div>
  );
};

export default BlogListPage;
