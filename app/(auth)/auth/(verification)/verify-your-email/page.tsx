"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendEmailVerificationLink } from "@/utilities/auth/sendEmailVerificationLink";

//A user will be redirected to this screen after attempting to signin with a non-verified email.

const VerifyYourEmail = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const email = session?.user?.email as string;

  const { mutateAsync } = sendEmailVerificationLink(email);

  useEffect(() => {
    const sendEmail = async () => {
      await mutateAsync();
    };

    sendEmail();
  }, [mutateAsync]); //Email verification link will be sent to user as the page loads.

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]); //Inspecting if a user is authenticated.

  return (
    <div>
      <p>Verify your email address to continue using the term hub</p>

      <div>
        <p>Did not recieve any email?</p>

        <button type="button" onClick={async () => await mutateAsync()}>
          Resend verification link
        </button>
      </div>
    </div>
  );
};

export default VerifyYourEmail;
