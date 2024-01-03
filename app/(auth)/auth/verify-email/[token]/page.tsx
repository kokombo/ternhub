"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { RotatingLinesLoader } from "@/components";
import { useEffect } from "react";

const VerifyEmailPage = () => {
  const { token } = useParams();

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
        toast.success(`${data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });

        redirect("/");
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
        <RotatingLinesLoader />
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
