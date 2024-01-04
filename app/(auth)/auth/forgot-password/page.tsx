"use client";

import { Formik, Form } from "formik";
import {
  InputField,
  SubmitFormLoader,
  SubmitButton,
  CustomError,
  Logo,
  AuthCTA,
} from "@/components";
import axios from "axios";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { GroteskNormal } from "@/app/font";
import Image from "next/image";
import { images } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validateForgetPasswordForm = Yup.object({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter the email associated with your account."),
});

const ForgotPassword = () => {
  const router = useRouter();

  let errorResponse: any;

  const passwordResetLinkRequest = async (email: string) => {
    const res = await axios.post(
      "/api/user/reset-password",
      JSON.stringify(email)
    );

    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
    "sendPasswordResetLink",

    passwordResetLinkRequest,

    {
      onSuccess: (data) => {
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });

        router.push("/");
      },
    }
  );

  if (error) errorResponse = error;

  const sendPasswordResetLink = async (values: { email: string }) => {
    const { email } = values;

    await mutateAsync(email);
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px] mt-3 lg:mt-6">
        <Logo />

        <h1 className="text-2xl lg:text-[40px]" style={GroteskNormal.style}>
          Reset Your Password!
        </h1>

        <Formik
          initialValues={{ email: "" }}
          onSubmit={sendPasswordResetLink}
          validationSchema={validateForgetPasswordForm}
        >
          <Form className="flex flex-col gap-9 w-full">
            <InputField
              label="Enter Your Email."
              name="email"
              type="text"
              id="email"
              placeholder="Enter the email associated with your TernHub account."
            />

            <div className="relative flex flex-col items-center">
              {isLoading ? (
                <SubmitFormLoader />
              ) : (
                <SubmitButton label="Submit" />
              )}

              {isError && (
                <span className="absolute bottom-[-28px]">
                  <CustomError
                    message={errorResponse?.response?.data?.message}
                    loading={isLoading}
                  />
                </span>
              )}
            </div>
          </Form>
        </Formik>

        <div className="w-full flex flex-col items-center gap-5">
          <AuthCTA
            url="/auth/signin"
            label="Remember your password now?"
            cta="Sign in"
          />
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.loginscreenimage}
          alt="forgot password page cover image"
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

export default ForgotPassword;
