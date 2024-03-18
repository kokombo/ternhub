"use client";

import { BlogsList } from "@/containers";
import { useGetAllBlogs } from "@/utilities/data-fetching/getAllBlogs";

const AdminBlogsListPage = () => {
  const { blogs, isLoading, isError, refetch, error } = useGetAllBlogs();

  return (
    <div className="flex flex-col py-11 lg:py-[50px] sm:px-[6.94%] px-5 gap-[25px] ">
      <h1 className="text-[28px] font-medium self-center">Manage All Blogs</h1>

      <BlogsList
        data={blogs}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
        noDataLabel="There are no available blogs."
        rootUrl="/admin/blogs"
      />
    </div>
  );
};

export default AdminBlogsListPage;
