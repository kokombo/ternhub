import "@/styles/globals.css";
import { EmailVerificationSegmentNavbar } from "@/components";
import { getServerSession } from "@/utilities/auth/getServerSession";
import { Fragment } from "react";

export default async function EmailVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <Fragment>
      <EmailVerificationSegmentNavbar session={session} />
      {children}
    </Fragment>
  );
}
