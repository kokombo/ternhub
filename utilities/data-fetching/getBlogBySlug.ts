import axios from "axios";
import { useQuery } from "react-query";

export const getBlogBySlug = (slug: string | string[]) => {
  const getBlogBySlugRequest = async (): Promise<BlogType | undefined> => {
    return await axios.get(`/api/blog/${slug}`);
  };

  const {
    data: blog,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    "getBlogBySlug",

    getBlogBySlugRequest,

    {
      refetchOnWindowFocus: false,
    }
  );

  return { blog, isLoading, error, isError, refetch };
};
