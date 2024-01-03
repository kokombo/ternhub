"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RotatingLinesLoader } from "@/components";
import { useEffect } from "react";

const VerifyEmailPage = () => {
  const { token } = useParams();

  const router = useRouter();

  const verifyEmailRequest = async () => {
    const res = await axios.put(`/api/user/verify-email/${token}`);
    return res.data;
  };

  let errorResponse: any;

  const { mutateAsync, data, error, isLoading, isError } = useMutation(
    ["verifyEmail", token],

    verifyEmailRequest,

    {
      onSuccess: (data) => {
        router.push("/");

        toast.success(`${data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );

  if (error) errorResponse = error;

  useEffect(() => {
    const verifyUserEmail = async () => {
      await mutateAsync();
    };

    verifyUserEmail();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center gap-1">
          <p>Verifying...</p>
          <RotatingLinesLoader />
        </div>
      ) : isError ? (
        <div>
          <p>{errorResponse?.response?.data?.message}</p>
        </div>
      ) : (
        <div>
          <p>{data?.message} </p>
        </div>
      )}
    </>
  );
};

export default VerifyEmailPage;
