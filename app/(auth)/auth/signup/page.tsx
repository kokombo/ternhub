"use client";

import { useState } from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import {
  SubmitButton,
  AuthCTA,
  Logo,
  InputField,
  SelectField,
  CustomError,
  SocialAuthFrame,
} from "@/components";
import { SubmitFormLoader } from "@/components/loaders/loaders";
import Image from "next/image";
import { images, icons } from "@/constants";
import axios, { type AxiosError } from "axios";
import { useMutation } from "react-query";
import { signIn } from "next-auth/react";
import { professions } from "@/constants/data";
import useShowPassword from "@/utilities/hooks/useShowPassword";
import { useRouter } from "next/navigation";
import { GroteskNormal } from "@/app/font";
import { signupFormValidationSchema } from "@/utilities/validation/form-validations";

type Data = {
  user: User;
};

const SignUpPage = () => {
  const { showPassword, onClickIcon } = useShowPassword();
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const signupFormRequest = async (formData: UserSignupDataType) => {
    const res = await axios.post("/api/user", formData);
    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    Data,
    AxiosError<ErrorResponse>,
    UserSignupDataType
  >("signup", signupFormRequest);

  const createUserAccount = async (
    values: UserSignupDataType,
    onSubmitProps: FormikHelpers<UserSignupDataType>
  ) => {
    await mutateAsync(values, {
      onSuccess: async () => {
        setRedirecting(true);
        const email = values.email;
        const password = values.password;

        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/auth/email-verification",
          redirect: false,
        })
          .then((res) => {
            if (res?.ok) {
              router.push("/auth/email-verification");
            }
          })
          .finally(() => {
            setRedirecting(false);
            onSubmitProps.resetForm();
          });
      },
    });
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]">
        <Logo />

        <div className="flex flex-col gap-8">
          <h1 className="text-2xl lg:text-[40px]" style={GroteskNormal.style}>
            Create an account
          </h1>

          <SocialAuthFrame
            onClick={() =>
              signIn("google", { callbackUrl: "/jobs", redirect: false })
            }
            authName="Google"
            label="Sign up"
            icon={icons.google}
            disabled={isLoading || redirecting}
          />

          <div className="flex items-center gap-[10px] text-textblack text-base">
            <hr className="w-full" /> or <hr className="w-full" />
          </div>
        </div>

        <>
          <Formik
            initialValues={{
              email: "",
              password: "",
              profession: "",
              name: "",
            }}
            onSubmit={createUserAccount}
            validationSchema={signupFormValidationSchema}
            validateOnBlur={false}
          >
            <Form className="flex flex-col gap-8 w-full">
              <InputField
                label="Fullname"
                name="name"
                id="name"
                type="text"
                disabled={isLoading || redirecting}
              />

              <InputField
                label="Email"
                name="email"
                id="email"
                type="text"
                disabled={isLoading || redirecting}
              />

              <InputField
                label="Password"
                name="password"
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                setPasswordVisible={showPassword}
                togglePasswordIcon={onClickIcon}
                passwordField={true}
                disabled={isLoading || redirecting}
              />

              <SelectField
                label="Profession"
                name="profession"
                id="profession"
                data={professions}
                disabled={isLoading || redirecting}
              />

              <span className="relative flex flex-col items-center gap-2">
                {isLoading || redirecting ? (
                  <SubmitFormLoader />
                ) : (
                  <SubmitButton label="Sign up" />
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
        </>

        <div className="w-full flex flex-col items-center gap-5">
          <AuthCTA
            url="/auth/signin"
            label="Already have an account?"
            cta="Log in"
          />
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.signupscreenimage}
          alt="signup page cover image"
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

export default SignUpPage;
