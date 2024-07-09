import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetAllFaqs = () => {
  const fetchFaqsRequest = async () => {
    const res = await axios.get("/api/faq", {
      headers: {
        Accept: "application/json",
      },
    });
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
