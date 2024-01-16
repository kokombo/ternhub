"use client";

import { useParams } from "next/navigation";
import { BlogInfoPage } from "@/containers";
import { AdminToolBox } from "@/components";
import { getBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";

const AdminBlogInfoPage = () => {
  const { slug } = useParams();

  const { blog, isLoading, isError, error, refetch } = getBlogBySlug(slug);

  return (
    <div className="py-11 ">
      <div className="flex flex-start sm:px-[6.94%] px-5">
        <AdminToolBox
          editButtonLabel="Edit Blog"
          editButtonUrl={`/admin/blogs/${slug}/edit`}
          deleteButtonLabel="Delete Blogs"
          deleteButtonOnclick={() => {}}
        />
      </div>

      <BlogInfoPage
        data={blog}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        rootUrl="/admin/blogs"
      />
    </div>
  );
};

export default AdminBlogInfoPage;
