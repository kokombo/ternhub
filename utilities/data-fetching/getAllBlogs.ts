import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { setAllBlogs } from "@/redux-toolkit/slices/blog";
import { useDispatch } from "react-redux";

export const useGetAllBlogs = () => {
  const dispatch = useDispatch();

  const fetchBlogsRequest = async () => {
    const res = await axios.get("/api/blog", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  };

  const {
    data: blogs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<BlogType[], AxiosError<ErrorResponse>>(
    "fetchBlogs",

    fetchBlogsRequest,

    {
      onSuccess: (data) => {
        dispatch(setAllBlogs(data));
      },

      refetchOnWindowFocus: false,

      staleTime: 60 * 60 * 1000,
    }
  );

  return { blogs, isLoading, isError, error, refetch };
};
