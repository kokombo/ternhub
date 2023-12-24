"use client";
import { BlogsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";

const AdminBlogsListPage = () => {
  const fetchBlogsRequest = async (): Promise<BlogType[] | undefined> => {
    const res = await axios.get("/api/blog");
    return res.data;
  };

  const {
    data: blog,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    "fetchBlogs",

    fetchBlogsRequest,

    {
      refetchOnWindowFocus: false,

      staleTime: 60 * 60 * 1000,
    }
  );

  return (
    <div className="flex flex-col py-11 lg:py-[50px] sm:px-[6.94%] px-5 gap-[25px] ">
      <h1 className="text-[28px] font-medium self-center">Manage All Blogs</h1>

      <BlogsList
        data={blog}
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
