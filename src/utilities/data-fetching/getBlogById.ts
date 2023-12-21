import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

export const getBlogById = async (blogId: string | string[]) => {
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

  return { data, isLoading, error, isError, refetch };
};
