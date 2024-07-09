import axios, { type AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const useSendEmailVerificationLink = (
  email: string | null | undefined
) => {
  const emailVerificationLinkRequest = async () => {
    const res = await axios.post(
      "/api/user/verify-email",
      JSON.stringify(email),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string | null | undefined
  >(
    ["sendEmailVerificationLink"],

    emailVerificationLinkRequest,

    {
      retry: 0,

      onSuccess: (data) => {
        toast.info(`${data?.message}`);
      },

      onError: (error) => {
        toast.error(`${error?.response?.data?.message}`);
      },
    }
  );

  const sendEmailVerificationLink = async () => {
    await mutateAsync(email);
  };

  return { sendEmailVerificationLink, error };
};
