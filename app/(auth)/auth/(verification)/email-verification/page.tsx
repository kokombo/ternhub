"use client";
import { useSendEmailVerificationLink } from "@/utilities/auth/sendEmailVerificationLink";
import { GroteskNormal } from "@/app/font";
import { useCountdownTimer } from "@/utilities/hooks";
import { useSession } from "next-auth/react";

const EmailVerification = () => {
  const { data: session } = useSession();
  const { sendEmailVerificationLink } = useSendEmailVerificationLink(
    session?.user.email
  );
  const { newTime, setTime } = useCountdownTimer(0);

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
              setTime(60);
              sendEmailVerificationLink();
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
