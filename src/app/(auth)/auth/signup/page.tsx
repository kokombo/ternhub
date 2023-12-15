"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { SubmitButton, AuthCTA, Logo, SubmitFormLoader } from "@/components";
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
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { signIn } from "next-auth/react";

const userData: UserSignupDataType = {
  email: "",
  password: "",
  profession: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email address is required!"),
  password: Yup.string().required("Please type in your password!"),
  profession: Yup.string().required("Please select your profession!"),
});

const SignUpPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const initializeProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    initializeProviders();
  }, []);

  const signupFormRequest = async (formData: UserSignupDataType) => {
    const res = await axios.post("/api/user", formData);
    return res;
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation(signupFormRequest);

  const createUserAccount = async (
    values: UserSignupDataType,
    onSubmitProps: FormikHelpers<UserSignupDataType>
  ) => {
    await mutateAsync(values)
      .then(async (res) => {
        console.log(res.data);

        if (isSuccess) {
          const { email, password } = values;

          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
            redirect: true,
          });

          onSubmitProps.resetForm();
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col md:px-[13.8%] px-5 py-4 gap-8 lg:gap-[50px]">
        <Logo />

        <div className="flex flex-col gap-8">
          <h1>Create an account</h1>

          <SocialAuths providers={providers} label="Sign up with" />

          <div className="flex items-center gap-[10px] text-textblack text-base">
            <hr className="w-full"></hr> or <hr className="w-full"></hr>
          </div>
        </div>

        <div>
          <Formik
            initialValues={userData}
            onSubmit={createUserAccount}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-8 w-full">
              <div className="flex flex-col items-start gap-3 ">
                <label htmlFor="email">Email</label>

                <Field type="text" name="email" id="email" className="input" />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red text-base"
                />
              </div>

              <div className="flex flex-col items-start gap-3 ">
                <label htmlFor="password">Password</label>

                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="input"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red text-base"
                />
              </div>

              <div className="flex flex-col items-start gap-3 ">
                <label htmlFor="profession">Profession</label>

                <Field
                  type="select"
                  name="profession"
                  id="profession"
                  className="input"
                />

                <ErrorMessage
                  name="profession"
                  component="p"
                  className="text-red text-base"
                />
              </div>

              <div className="w-full flex flex-col items-center gap-5">
                {/* {isError && <p>{error}</p>} */}

                <>
                  {isLoading ? (
                    <SubmitFormLoader />
                  ) : (
                    <SubmitButton label="Sign up" />
                  )}
                </>

                <AuthCTA
                  url="/auth/signin"
                  label="Already have an account?"
                  cta="Log in"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </section>

      <section className="h-full w-full lg:inline hidden">
        <Image
          src={images.signupscreenimage}
          alt="signup page image"
          className="object-cover h-full w-full"
          placeholder="blur"
        />
      </section>
    </div>
  );
};

export default SignUpPage;
