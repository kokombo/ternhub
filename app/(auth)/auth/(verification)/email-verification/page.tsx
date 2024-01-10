"use client";

import { useSession } from "next-auth/react";
import { sendEmailVerificationLink } from "@/utilities/auth/sendEmailVerificationLink";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GroteskNormal } from "@/app/font";
import { useCountdownTimer } from "@/utilities/hooks";

//A new user will be redirected to this wait screen after signup. Email has been sent automatically after a success signup. The email contains a continue url back to the application.

const EmailVerification = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const email = session?.user?.email as string;

  const { mutateAsync } = sendEmailVerificationLink(email); //A user can resend verification link email by calling mutateAsync.

  const { newTime, setTime } = useCountdownTimer(30);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex_center justify-center text-center gap-6 h-full padding">
      <h1
        className="text-2xl lg:text-[40px] text-purple"
        style={GroteskNormal.style}
      >
        Email Verification
      </h1>

      <p className="text-base lg:text-lg">
        We have sent a verification link to your email. Please verify your email
        address to continue using TheTernHub.
      </p>

      <div className="flex_center gap-3">
        <p className="text-base lg:text-lg">Did not recieve an email?</p>

        {newTime === "00" ? (
          <button
            type="button"
            onClick={async () => {
              setTime(30);

              await mutateAsync();
            }}
            className="blue_button"
          >
            Resend email verification link
          </button>
        ) : (
          <p className="text-base lg:text-lg">
            Send code again in 00:{newTime}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
