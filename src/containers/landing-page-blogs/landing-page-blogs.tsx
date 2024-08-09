"use client";

import { SectionHeading, BlogCard, StyledLink } from "@/components";
import BlogSkeletonLoader from "@/utilities/skeletons/blog-skeleton-loader";
import { useGetAllBlogs } from "@/utilities/data-fetching/getAllBlogs";

const LandingPageBlogs = () => {
  const { blogs, isLoading, isError } = useGetAllBlogs();

  return (
    <section className="container">
      <SectionHeading
        heading="Resources"
        subheading="Stay up-to-date and find inspiration in out exciting blog resources."
      />

      <div className="landing_page_blog_container">
        {isLoading || isError
          ? [...Array(4)].map((_, index) => (
              <BlogSkeletonLoader key={index.toString()} />
            ))
          : blogs &&
            blogs.length > 1 &&
            blogs
              .slice(0, 4)
              .map((blog) => (
                <BlogCard key={blog._id} props={blog} rootUrl="/blogs" />
              ))}
      </div>

      <StyledLink
        label="View more blogs"
        arialabel="Landing page link to all blogs page"
        url="/blogs"
        extraClasses="self-center blue_button"
        prefetch={true}
      />
    </section>
  );
};

export default LandingPageBlogs;
