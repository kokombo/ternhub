"use client";

import { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { SubmitButton, AuthCTA, Logo, InputField } from "@/components";
import Link from "next/link";
import * as Yup from "yup";
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { SocialAuths } from "@/containers";
import Image from "next/image";
import { images } from "@/constants";
import { signIn } from "next-auth/react";

const userLoginData: UserLoginDataType = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email address is required!"),
  password: Yup.string().required("Password is required to sign in!"),
});

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [error, setError] = useState<string | null | undefined>(null);

  useEffect(() => {
    const initializeProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    initializeProviders();
  }, []);

  const signAUserIn = async (
    values: UserLoginDataType,
    onSubmitProps: FormikHelpers<UserLoginDataType>
  ) => {
    await signIn("credentials", {
      ...values,
      callbackUrl: "/",
      redirect: true,
    })
      .then((res) => {
        if (res?.ok) {
          onSubmitProps.resetForm();
        } else {
          setError(res?.error);
        }
      })
      .catch((error) => {
        return setError(error || "Something went wrong, please try again!");
      });
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]">
        <Logo />

        <div className="flex flex-col gap-8">
          <h1>Welcome Back!</h1>

          <SocialAuths providers={providers} label="Log in with" />

          <div className="flex items-center gap-[10px] text-textblack text-base">
            <hr className="w-full"></hr> or <hr className="w-full"></hr>
          </div>
        </div>

        <div>
          <Formik
            initialValues={userLoginData}
            onSubmit={signAUserIn}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-8 w-full">
              <InputField label="Email" name="email" id="email" type="text" />

              <InputField
                label="Password"
                name="password"
                id="password"
                type="password"
              />

              <Link
                href={"/forgot-password"}
                aria-label="link to reset password page"
                className="text-purple text-[15px] font-sans font-[400] self-end"
              >
                Forgot Password?
              </Link>

              <div className="w-full flex flex-col items-center gap-5">
                {error && <p>{error}</p>}

                <SubmitButton label="Log in" />

                <AuthCTA
                  url="/auth/signup"
                  label="Don't have an account?"
                  cta="Sign up"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.loginscreenimage}
          alt="login page image"
          className="object-cover h-full w-full"
          placeholder="blur"
        />
      </section>
    </div>
  );
};

export default SignInPage;
