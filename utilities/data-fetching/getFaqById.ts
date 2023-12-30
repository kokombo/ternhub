import axios from "axios";
import { useQuery } from "react-query";

export const getFaqById = (faqId: string | string[]) => {
  const getFaqByIdRequest = async (): Promise<FaqType | undefined> => {
    const res = await axios.get(`/api/faq/${faqId}`);
    return res.data;
  };

  const {
    data: faq,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery(
    "getFaqById",

    getFaqByIdRequest,

    {
      refetchOnWindowFocus: false,
    }
  );

  return { faq, isLoading, isError, error, isSuccess };
};
