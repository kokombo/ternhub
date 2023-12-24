"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { BlogInfoPage } from "@/containers";
import { AdminToolBox } from "@/components";

const AdminBlogInfoPage = () => {
  const { slug } = useParams();

  const router = useRouter();

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
  } = useQuery(
    "getBlogBySlug",

    getBlogBySlugRequest,

    {
      refetchOnWindowFocus: false,

      retry: 1,
    }
  );

  return (
    <div className="w-full py-11 lg:py-[100px] sm:px-[6.94%] px-5 gap-[60px] lg:gap-[100px]">
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
