"use client";

import { Formik, Form, FormikHelpers } from "formik";
import {
  SubmitButton,
  AuthCTA,
  Logo,
  SubmitFormLoader,
  InputField,
  SelectField,
  CustomError,
  SocialAuthFrame,
} from "@/components";
import * as Yup from "yup";
import Image from "next/image";
import { images, icons } from "@/constants";
import axios from "axios";
import { useMutation } from "react-query";
import { signIn } from "next-auth/react";
import { professions } from "@/constants/data";
import useShowPassword from "@/utilities/hooks/useShowPassword";
import { useRouter } from "next/navigation";
import { GroteskNormal } from "@/app/font";

const userData: UserSignupDataType = {
  email: "",
  password: "",
  profession: "",
  name: "",
};

type Data = {
  user: User;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Please enter your full name.")
    .matches(/^[A-Za-z\s]+$/, "Invalid characters in name."),
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Email address is required."),
  password: Yup.string().required("Choose a password."),
});

{
  /* /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ */
}

const SignUpPage = () => {
  const { showPassword, onClickIcon } = useShowPassword();

  const router = useRouter();

  const signupFormRequest = async (
    formData: UserSignupDataType
  ): Promise<Data | undefined> => {
    const res = await axios.post("/api/user", formData);

    return res.data;
  };

  let errorResponse: any;

  const { mutateAsync, isLoading, isError, error } =
    useMutation(signupFormRequest);

  if (error) errorResponse = error;

  const createUserAccount = async (
    values: UserSignupDataType,

    onSubmitProps: FormikHelpers<UserSignupDataType>
  ) => {
    await mutateAsync(values, {
      onSuccess: async () => {
        const email = values.email;

        const password = values.password;

        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/jobs",
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            router.push("/jobs");

            // /auth/email-verification

            onSubmitProps.resetForm();
          }
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
          />

          <div className="flex items-center gap-[10px] text-textblack text-base">
            <hr className="w-full"></hr> or <hr className="w-full"></hr>
          </div>
        </div>

        <>
          <Formik
            initialValues={userData}
            onSubmit={createUserAccount}
            validationSchema={validationSchema}
            validateOnBlur={false}
          >
            <Form className="flex flex-col gap-8 w-full">
              <InputField label="Fullname" name="name" id="name" type="text" />

              <InputField label="Email" name="email" id="email" type="text" />

              <InputField
                label="Password"
                name="password"
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                setPasswordVisibile={showPassword}
                togglePasswordIcon={onClickIcon}
                passwordField={true}
              />

              <SelectField
                label="Profession"
                name="profession"
                id="profession"
                data={professions}
              />

              <span className="relative flex flex-col items-center gap-2">
                {isLoading ? (
                  <SubmitFormLoader />
                ) : (
                  <SubmitButton label="Log in" />
                )}

                {isError && (
                  <CustomError
                    message={errorResponse?.response?.data?.message}
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
