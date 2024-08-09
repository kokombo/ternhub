import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetBlogBySlug = (slug: string | string[]) => {
  const getBlogBySlugRequest = async () => {
    const res = await axios.get(`/api/blog/${slug}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  };

  const {
    data: blog,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useQuery<BlogType, AxiosError<ErrorResponse>>(
    ["getBlogBySlug", slug],
    getBlogBySlugRequest,
    {
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );

  return { blog, isLoading, error, isError, refetch, isSuccess };
};
