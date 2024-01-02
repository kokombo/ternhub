import axios from "axios";
import { useQuery } from "react-query";
import { setAllBlogs } from "@/redux-toolkit/slices/blog";
import { useDispatch } from "react-redux";

export const getAllBlogs = () => {
  const dispatch = useDispatch();

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
      onSuccess: (data) => {
        dispatch(setAllBlogs(data));
      },

      refetchOnWindowFocus: false,

      staleTime: 60 * 60 * 1000,
    }
  );

  return { blogs, isLoading, isError, error, refetch };
};
