"use client";

import { useParams } from "next/navigation";
import { BlogInfoPage } from "@/containers";
import { AdminToolBox } from "@/components";
import { getBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";

const AdminBlogInfoPage = () => {
  const { slug } = useParams();

  const { blog, isLoading, isError, error, refetch } = getBlogBySlug(slug);

  console.log(blog)

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

export default AdminBlogInfoPage;
