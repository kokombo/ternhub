import axios from "axios";
import { useQuery } from "react-query";

export const getAllFaqs = () => {
  const fetchFaqsRequest = async (): Promise<FaqType[] | undefined> => {
    const res = await axios.get("/api/faq");
    return res.data;
  };

  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery("getAllFaqs", fetchFaqsRequest, {
    refetchOnWindowFocus: false,

    staleTime: 60 * 60 * 60 * 1000,
  });

  return { faqs, isLoading, isError };
};
