"use client";
import { Form, Formik } from "formik";
import {
  InputField,
  SubmitButton,
  CustomError,
  Logo,
  AuthCTA,
} from "@/components";
import { SubmitFormLoader } from "@/components/loaders/loaders";
import axios, { type AxiosError } from "axios";
import { useMutation } from "react-query";
import { GroteskNormal } from "@/app/font";
import Image from "next/image";
import { images } from "@/constants";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordFormValidationSchema } from "@/utilities/validation/form-validations";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const passwordResetRequest = async (password: string) => {
    const res = await axios.put(
      `/api/user/reset-password?token=${token}`,
      JSON.stringify(password),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >("resetPassword", passwordResetRequest, {
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      router.push("/auth/signin");
    },
  });

  const resetPassword = async (values: { password: string }) => {
    const { password } = values;
    await mutateAsync(password);
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]  ">
        <Logo />

        <h1 className="text-2xl lg:text-[40px]" style={GroteskNormal.style}>
          Change Your Password!
        </h1>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={resetPassword}
          validationSchema={resetPasswordFormValidationSchema}
        >
          <Form className="flex flex-col gap-9 w-full">
            <InputField
              label="Enter a new password"
              name="password"
              type="text"
              id="password"
              autoComplete="off"
            />

            <span className="relative flex flex-col items-center gap-2">
              {isLoading ? (
                <SubmitFormLoader />
              ) : (
                <SubmitButton label="Submit" />
              )}

              {isError && (
                <CustomError
                  message={error?.response?.data?.message}
                  loading={isLoading}
                />
              )}
            </span>
          </Form>
        </Formik>

        <div className="w-full flex flex-col items-center gap-5">
          <AuthCTA
            url="/auth/sigin"
            label="Remember your password now?"
            cta="Sign in"
          />
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.signupscreenimage}
          alt="reset password page cover image"
          className="object-cover h-full w-full"
          placeholder="blur"
          loading="eager"
          priority={true}
          quality={100}
        />
      </section>
    </div>
  );
};

export default ResetPassword;
