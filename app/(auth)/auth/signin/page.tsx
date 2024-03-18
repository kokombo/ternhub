"use client";

import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import {
  SubmitButton,
  AuthCTA,
  Logo,
  InputField,
  CustomError,
  SocialAuthFrame,
  SubmitFormLoader,
} from "@/components";
import Link from "next/link";
import Image from "next/image";
import { icons, images } from "@/constants";
import { signIn } from "next-auth/react";
import useShowPassword from "@/utilities/hooks/useShowPassword";
import { useRouter } from "next/navigation";
import { GroteskNormal } from "@/app/font";
import { loginFormValidationSchema } from "@/utilities/validation/form-validations";

const SignInPage = () => {
  const { showPassword, onClickIcon } = useShowPassword();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null | undefined>(null);

  const router = useRouter();

  const signAUserIn = async (
    values: UserLoginDataType,

    onSubmitProps: FormikHelpers<UserLoginDataType>
  ) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        ...values,
        callbackUrl: "/jobs",
        redirect: false,
      });

      if (res?.ok) {
        router.push("/jobs");

        onSubmitProps.resetForm();
      }

      if (res?.error) {
        setError(res?.error);
      }
    } catch (error: any) {
      return setError(error || "Something went wrong, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]">
        <Logo />

        <div className="flex flex-col gap-8">
          <h1 className="text-2xl lg:text-[40px]" style={GroteskNormal.style}>
            Welcome back!
          </h1>

          <SocialAuthFrame
            onClick={() =>
              signIn("google", { callbackUrl: "/jobs", redirect: false })
            }
            authName="Google"
            label="Log in"
            icon={icons.google}
          />

          <div className="flex items-center gap-[10px] text-textblack text-base">
            <hr className="w-full"></hr> or <hr className="w-full"></hr>
          </div>
        </div>

        <>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={signAUserIn}
            validationSchema={loginFormValidationSchema}
            validateOnBlur={false}
          >
            <Form className="flex flex-col gap-8 w-full">
              <InputField
                label="Email"
                name="email"
                id="email"
                type="text"
                disabled={loading}
              />

              <InputField
                label="Password"
                name="password"
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                setPasswordVisible={showPassword}
                togglePasswordIcon={onClickIcon}
                passwordField={true}
                disabled={loading}
              />

              <Link
                href={"/auth/forgot-password"}
                aria-label="link to reset password page"
                className="text-purple text-[15px] font-sans font-[400] self-end"
              >
                Forgot Password?
              </Link>

              <div className="relative flex flex-col items-center w-full gap-2">
                {loading ? (
                  <SubmitFormLoader />
                ) : (
                  <SubmitButton label="Log in" />
                )}

                {error && <CustomError message={error} loading={loading} />}
              </div>
            </Form>
          </Formik>
        </>

        <div className="w-full flex flex-col items-center gap-5">
          <AuthCTA
            url="/auth/signup"
            label="Don't have an account?"
            cta="Sign up"
          />
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.loginscreenimage}
          alt="login page cover image"
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

export default SignInPage;
