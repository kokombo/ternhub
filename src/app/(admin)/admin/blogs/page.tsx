"use client";
import { BlogsList } from "@/containers";
import axios from "axios";
import { useQuery } from "react-query";

const AdminBlogsListPage = () => {
  const fetchBlogsRequest = async (): Promise<BlogType[] | undefined> => {
    return await axios.get("/api/blog");
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "fetchBlogs",
    fetchBlogsRequest,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="flex flex-col py-11 lg:py-[50px] sm:px-[6.94%] px-5 w-full gap-[25px] ">
      <h1 className="text-[28px] font-medium self-center">Manage All Blogs</h1>

      <BlogsList
        data={data}
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
