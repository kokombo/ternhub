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
import * as Yup from "yup";
import Image from "next/image";
import { icons, images } from "@/constants";
import { signIn } from "next-auth/react";
import useShowPassword from "@/utilities/hooks/useShowPassword";
import { useRouter } from "next/navigation";
import { GroteskNormal } from "@/app/font";

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

        <div>
          <Formik
            initialValues={userLoginData}
            onSubmit={signAUserIn}
            validationSchema={validationSchema}
            validateOnBlur={false}
          >
            <Form className="flex flex-col gap-8 w-full">
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

              <Link
                href={"/forgot-password"}
                aria-label="link to reset password page"
                className="text-purple text-[15px] font-sans font-[400] self-end"
              >
                Forgot Password?
              </Link>

              <span className="relative flex flex-col items-center">
                {loading ? (
                  <SubmitFormLoader />
                ) : (
                  <SubmitButton label="Log in" />
                )}

                {error && (
                  <span className="absolute bottom-[-28px]">
                    <CustomError message={error} loading={loading} />
                  </span>
                )}
              </span>
            </Form>
          </Formik>
        </div>

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
          alt="login page image"
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
