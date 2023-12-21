"use client";
import axios from "axios";
import { useQuery } from "react-query";
import { BlogsList } from "@/containers";

const BlogListPage = () => {
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
    <BlogsList
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      noDataLabel="There are no available blogs."
      rootUrl="/blogs"
    />
  );
};

export default BlogListPage;
