import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const sendEmailVerificationLink = (email: string) => {
  const emailVerificationLinkRequest = async () => {
    const res = await axios.post(
      "/api/user/verify-email",
      JSON.stringify(email)
    );

    return res.data;
  };

  const { mutateAsync, error } = useMutation(
    ["sendEmailVerificationLink"],

    emailVerificationLinkRequest,

    {
      retry: 0,

      onSuccess: (data) => {
        toast.info(`${data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },

      onError: (error: any) => {
        toast.error(`${error?.response?.data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );

  return { mutateAsync, error };
};
