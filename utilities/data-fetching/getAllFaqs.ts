import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetAllFaqs = () => {
  const fetchFaqsRequest = async () => {
    const res = await axios.get("/api/faq");
    return res.data;
  };

  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery<FaqType[], AxiosError<ErrorResponse>>(
    "getAllFaqs",
    fetchFaqsRequest,
    {
      refetchOnWindowFocus: false,

      staleTime: 60 * 60 * 60 * 1000,
    }
  );

  return { faqs, isLoading, isError };
};
