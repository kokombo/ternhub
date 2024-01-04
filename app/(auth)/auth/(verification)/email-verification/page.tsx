"use client";

import { useSession } from "next-auth/react";
import { sendEmailVerificationLink } from "@/utilities/auth/sendEmailVerificationLink";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//A new user will be redirected to this wait screen after signup. Email has been sent automatically after a success signup. The email contains a continue url back to the application.

const EmailVerification = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const email = session?.user?.email as string;

  const { mutateAsync } = sendEmailVerificationLink(email); //A user can resend verification link email by calling mutateAsync.

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]); //Inspecting if a user is authenticated.

  return (
    <div>
      <p>
        We have sent an email verification link to your email. Please verify
        your email address to continue using TheTernHub.
      </p>

      <div>
        <p>Did not recieve an email?</p>

        <button type="button" onClick={async () => await mutateAsync()}>
          Resend verification link
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
