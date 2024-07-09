import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetFaqById = (faqId: string | string[]) => {
  const getFaqByIdRequest = async () => {
    const res = await axios.get(`/api/faq/${faqId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  };

  const {
    data: faq,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery<FaqType, AxiosError<ErrorResponse>>(
    ["getFaqById", faqId],

    getFaqByIdRequest,

    {
      refetchOnWindowFocus: false,
    }
  );

  return { faq, isLoading, isError, error, isSuccess };
};
