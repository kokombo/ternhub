import axios from "axios";
import { useQuery } from "react-query";

export const getAllBlogs = () => {
  const fetchBlogsRequest = async (): Promise<BlogType[] | undefined> => {
    const res = await axios.get("/api/blog");
    return res.data;
  };

  const {
    data: blogs,
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

  return { blogs, isLoading, isError, error, refetch };
};
