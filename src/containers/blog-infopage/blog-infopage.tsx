"use client";

import { BlogInfopageHeader, BlogInfopageBody, Message } from "@/components";
import { illustrations } from "@/constants";
import RelatedBlogs from "../related-blogs/related-blogs";
import { useGetAllBlogs } from "@/utilities/data-fetching/getAllBlogs";
import { Fragment } from "react";
import { useGetBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";

type Props = {
  rootUrl: string;
  slug: string | string[];
};

const BlogInfoPage = ({ rootUrl, slug }: Props) => {
  const { blog, isError, isLoading, error, refetch } = useGetBlogBySlug(slug);
  const { blogs } = useGetAllBlogs();

  const relatedBlogs = blogs
    ?.filter(
      (otherBlogs) =>
        otherBlogs._id !== blog?._id && otherBlogs.category === blog?.category
    )
    .slice(0, 4);

  return (
    <Fragment>
      {isLoading ? (
        <div className="min-h-screen" />
      ) : isError ? (
        <div className="flex_center">
          <Message
            message={error?.response?.data?.message}
            isError={isError}
            onClickButton={refetch}
            buttonLabel="Try again"
            illustration={illustrations.error_2}
          />
        </div>
      ) : (
        <div className="py-6 lg:py-[60px] sm:px-[6.94%] px-5 flex_center lg:gap-[75px] gap-10">
          <BlogInfopageHeader props={blog} />

          <BlogInfopageBody props={blog} />

          <RelatedBlogs relatedBlogs={relatedBlogs} rootUrl={rootUrl} />
        </div>
      )}
    </Fragment>
  );
};

export default BlogInfoPage;
