"use client";

import { Form, Formik } from "formik";
import {
  InputField,
  SubmitButton,
  CustomError,
  SubmitFormLoader,
  Logo,
  AuthCTA,
} from "@/components";
import axios from "axios";
import { useMutation } from "react-query";
import { GroteskNormal } from "@/app/font";
import Image from "next/image";
import { images } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validatePasswordResetForm = Yup.object({
  password: Yup.string()
    .required("Password field cannot be empty.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, a letter, a number and a special character."
    ),
});

const ResetPassword = () => {
  const params = new URLSearchParams();

  const token = params.get("token");

  const router = useRouter();

  let errorResponse: any;

  const passwordResetRequest = async (password: string) => {
    const res = await axios.put(
      `/api/user/reset-password?token=${token}`,
      JSON.stringify(password)
    );

    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
    "resetPassword",
    passwordResetRequest,
    {
      onSuccess: (data) => {
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });

        router.push("/auth/signin");
      },
    }
  );

  if (error) errorResponse = error;

  const resetPassword = async (values: { password: string }) => {
    const { password } = values;

    await mutateAsync(password);
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px] mt-3 lg:mt-6 ">
        <Logo />

        <h1 className="text-2xl lg:text-[40px]" style={GroteskNormal.style}>
          Change Your Password!
        </h1>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={resetPassword}
          validationSchema={validatePasswordResetForm}
        >
          <Form className="flex flex-col gap-9 w-full">
            <InputField
              label="Enter a new password"
              name="password"
              type="text"
              id="password"
              autoComplete="off"
            />

            <span className="relative flex flex-col items-center">
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
