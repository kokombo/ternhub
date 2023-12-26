"use client";
import { BlogInfoPage } from "@/containers";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";

const BlogPage = () => {
  const { slug } = useParams();

  const { blog, isError, isLoading, error, refetch } = getBlogBySlug(slug);

  return (
    <div>
      <BlogInfoPage
        data={blog}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default BlogPage;
