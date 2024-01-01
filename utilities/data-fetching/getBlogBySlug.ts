import axios from "axios";
import { useQuery } from "react-query";

export const getBlogBySlug = (slug: string | string[]) => {
  const getBlogBySlugRequest = async (): Promise<BlogType | undefined> => {
    const res = await axios.get(`/api/blog/${slug}`);
    return res.data;
  };

  const {
    data: blog,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useQuery(
    "getBlogBySlug",

    getBlogBySlugRequest,

    {
      refetchOnWindowFocus: false,

      cacheTime: 0,
    }
  );

  return { blog, isLoading, error, isError, refetch, isSuccess };
};
