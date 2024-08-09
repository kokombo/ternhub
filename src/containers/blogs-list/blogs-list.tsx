"use client";

import { RecentBlogCard, BlogCard, Message } from "@/components";
import BlogSkeletonLoader from "@/utilities/skeletons/blog-skeleton-loader";
import RecentBlogSkeletonLoader from "@/utilities/skeletons/recent-blog-skeleton-loader";
import { GroteskBold } from "@/app/font";
import { illustrations } from "@/constants";
import { Fragment } from "react";
import { useGetAllBlogs } from "@/utilities/data-fetching/getAllBlogs";

type Props = {
  rootUrl: string;
};

const BlogsList = ({ rootUrl }: Props) => {
  const { blogs, isLoading, isError, refetch, error } = useGetAllBlogs();

  return (
    <Fragment>
      {/*  Rendering most recent blog post */}

      <section>
        {isLoading ? (
          <RecentBlogSkeletonLoader />
        ) : blogs && blogs.length > 0 ? (
          <div className="recent_blog_wrapper">
            <h2
              className="text-xl lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
              style={GroteskBold.style}
            >
              Recent Post
            </h2>

            {blogs.slice(0, 1).map((blog) => {
              return (
                <RecentBlogCard key={blog._id} props={blog} rootUrl={rootUrl} />
              );
            })}
          </div>
        ) : null}
      </section>

      <section>
        {/* Rendering other blog posts*/}

        <Fragment>
          {isLoading ? (
            <div className="w-full blog_list_grid">
              {[...Array(8)].map((_, index) => (
                <BlogSkeletonLoader key={index.toString()} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center">
              <Message
                message={error?.response?.data?.message}
                isError={isError}
                buttonLabel="Try again"
                onClickButton={refetch}
                illustration={illustrations.error_2}
              />
            </div>
          ) : blogs && blogs.length === 0 ? (
            <div className="flex items-center justify-center">
              <Message
                message="There are no available blogs at this time. Please check back."
                illustration={illustrations.no_saved_jobs}
              />
            </div>
          ) : blogs && blogs.length > 1 ? (
            <div>
              <h2
                className="text-xl lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
                style={GroteskBold.style}
              >
                Must Read Blogs
              </h2>
              <div className="w-full blog_list_grid">
                {blogs.slice(1, 11).map((blog) => (
                  <BlogCard key={blog._id} props={blog} rootUrl={rootUrl} />
                ))}
              </div>
            </div>
          ) : null}
        </Fragment>

        {/* Rendering infinite load more button  */}

        {blogs && blogs.length > 9 ? (
          <button
            type="button"
            className="bg-purple hover:bg-blue text-white rounded-[10px] font-semibold lg:text-base text-sm w-[140px] h-12 mt-[50px] self-center"
          >
            Load more
          </button>
        ) : null}
      </section>
    </Fragment>
  );
};

export default BlogsList;
