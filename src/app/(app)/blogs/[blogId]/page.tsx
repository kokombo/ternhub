"use client";
import { BlogInfoPage } from "@/containers";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";

const BlogPage = () => {
  const { blogId } = useParams();

  const router = useRouter();

  const getBlogByIdRequest = async (): Promise<BlogType | undefined> => {
    const res = await axios.get(`/api/blog/${blogId}`);
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "getBlogById",

    getBlogByIdRequest,

    {
      refetchOnWindowFocus: false,

      retry: 1,

      onSuccess: (data) => {
        router.push(`${data?.slug}`);
      },
    }
  );

  return (
    <BlogInfoPage
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    />
  );
};

export default BlogPage;
