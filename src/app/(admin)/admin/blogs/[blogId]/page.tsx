"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { BlogInfoPage } from "@/containers";
import { AdminToolBox } from "@/components";

const AdminBlogInfoPage = () => {
  const { blogId } = useParams();

  const router = useRouter();

  const getBlogByIdRequest = async (): Promise<BlogType | undefined> => {
    const res = await axios.get(`/api/blog/${blogId}`);
    return res.data;
  };

  const {
    data: blog,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    "getBlogById",

    getBlogByIdRequest,

    {
      refetchOnWindowFocus: false,

      retry: 1,

      onSuccess: (blog) => {
        router.push(`${blog?.slug}`);
      },
    }
  );

  return (
    <div>
      <BlogInfoPage
        data={blog}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default AdminBlogInfoPage;
