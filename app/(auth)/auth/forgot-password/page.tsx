"use client";
import { Formik, Form } from "formik";
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
import { useRouter } from "next/navigation";
import { forgotPasswordFormValidationSchema } from "@/utilities/validation/form-validations";

const ForgotPassword = () => {
  const router = useRouter();

  const passwordResetLinkRequest = async (email: string) => {
    const res = await axios.post(
      "/api/user/reset-password",
      JSON.stringify(email)
    );
    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >("sendPasswordResetLink", passwordResetLinkRequest, {
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      router.push("/");
    },
  });

  const sendPasswordResetLink = async (values: { email: string }) => {
    const { email } = values;
    await mutateAsync(email);
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]">
        <Logo />

        <h1 className="text-2xl lg:text-[40px]" style={GroteskNormal.style}>
          Reset Your Password!
        </h1>

        <Formik
          initialValues={{ email: "" }}
          onSubmit={sendPasswordResetLink}
          validationSchema={forgotPasswordFormValidationSchema}
        >
          <Form className="flex flex-col gap-9 w-full">
            <InputField
              label="Enter Your Email."
              name="email"
              type="text"
              id="email"
              placeholder="Enter the email associated with your TernHub account."
            />

            <div className="relative flex flex-col items-center gap-2">
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
