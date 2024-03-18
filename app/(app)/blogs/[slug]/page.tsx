"use client";

import { BlogInfoPage } from "@/containers";
import { useParams } from "next/navigation";
import { useGetBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";

const BlogPage = () => {
  const { slug } = useParams();

  const { blog, isError, isLoading, error, refetch } = useGetBlogBySlug(slug);

  return (
    <>
      <BlogInfoPage
        data={blog}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        rootUrl="/blogs"
      />
    </>
  );
};

export default BlogPage;
