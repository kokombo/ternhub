"use client";
import { BlogInfoPage } from "@/containers";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";

const BlogPage = () => {
  const { blogId } = useParams();

  const router = useRouter();

  const getBlogByIdRequest = async (): Promise<BlogType | undefined> => {
    return await axios.get(`/api/blog/${blogId}`);
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "getBlogById",
    getBlogByIdRequest,
    {
      refetchOnWindowFocus: false,
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
