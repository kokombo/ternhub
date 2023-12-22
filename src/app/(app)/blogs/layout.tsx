"use client";
import { BlogsListpageTitle, Search } from "@/components";

const BlogsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col py-11 lg:py-[100px] sm:px-[6.94%] px-5 w-full">
      <section className="blog_list_header_wrapper">
        <BlogsListpageTitle />

        <Search
          buttonLabel="Search blog"
          placeholder="Search blog topic"
          onChange={() => {}}
        />
      </section>

      {children}
    </div>
  );
};

export default BlogsPageLayout;
