"use client";
import axios, { type AxiosError } from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { RotatingLinesLoader } from "@/components/loaders/loaders";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { illustrations } from "@/constants";
import { useSession } from "next-auth/react";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { update } = useSession();

  const verifyEmailRequest = async () => {
    const res = await axios.put(`/api/user/verify-email?token=${token}`, {
      headers: {
        Accept: "applicaton/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const { mutateAsync, data, error, isLoading, isError, isSuccess } =
    useMutation<MessageResponse, AxiosError<ErrorResponse>>(
      ["verifyEmail"],
      verifyEmailRequest
    );

  useEffect(() => {
    const verifyUserEmail = async () => {
      await mutateAsync();
    };
    verifyUserEmail();
  }, [mutateAsync]);

  return (
    <section className="padding">
      {isLoading ? (
        <div className="flex_center justify-center gap-2">
          <p>Verifying...</p>
          <RotatingLinesLoader />
        </div>
      ) : isError ? (
        <div className="flex_center justify-center gap-2">
          <Image
            src={illustrations.error_2}
            alt="Email verification error illustration"
            height={150}
            width={150}
            quality={100}
            priority
            loading="eager"
          />

          <p className="text-base lg:text-lg text-greyblack">
            {error?.response?.data?.message}
          </p>
        </div>
      ) : isSuccess ? (
        <div className="flex_center justify-center gap-2">
          <Image
            src={illustrations.success}
            alt="Email verification error illustration"
            height={150}
            width={150}
            quality={100}
            priority
            loading="eager"
          />

          <p className="text-base lg:text-lg text-greyblack">
            {data?.message}{" "}
          </p>

          <button
            type="button"
            onClick={() => {
              update();
              router.push("/");
            }}
            className="underline text-base lg:text-lg text-purple"
          >
            Click here to continue back to TernHub
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default VerifyEmailPage;
