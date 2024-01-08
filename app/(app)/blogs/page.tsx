"use client";

import { BlogsList } from "@/containers";
import { BlogsListpageTitle, Search } from "@/components";
import { getAllBlogs } from "@/utilities/data-fetching/getAllBlogs";

const BlogListPage = () => {
  const { blogs, isLoading, isError, error, refetch } = getAllBlogs();

  return (
    <div className="flex flex-col py-11 lg:py-[100px] sm:px-[6.94%] px-5 w-full">
      <section className="blog_list_header_wrapper">
        <BlogsListpageTitle />

        {/* <Search
          buttonLabel="Search"
          placeholder="Search blog"
          onChange={() => {}}
          value=""
          onClickSearchButton={() => {}}
          lgFrameWidth={458}
          lgInputWidth={250}
        /> */}
      </section>

      <BlogsList
        data={blogs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
        noDataLabel="There are no available blogs at this time. Please check back."
        rootUrl="/blogs"
      />
    </div>
  );
};

export default BlogListPage;
