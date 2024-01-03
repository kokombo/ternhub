"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { RotatingLinesLoader } from "@/components";

const VerifyEmailPage = () => {
  const { token } = useParams();

  const verifyEmailRequest = async () => {
    const res = await axios.put(`/api/user/verify-email/${token}`);
    return res.data;
  };

  let errorResponse: any;
  const { data, error, isLoading, isError } = useQuery(
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

  return (
    <div>
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
    </div>
  );
};

export default VerifyEmailPage;
