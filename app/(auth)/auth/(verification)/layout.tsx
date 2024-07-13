import "@/styles/globals.css";
import { EmailVerificationSegmentNavbar } from "@/components";
import { getCurrentServerSession } from "@/utilities/auth/getCurrentServerSession";

export default async function EmailVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentServerSession();

  return (
    <>
      <EmailVerificationSegmentNavbar session={session} />
      {children}
    </>
  );
}
