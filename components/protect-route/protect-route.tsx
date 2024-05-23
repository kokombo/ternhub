import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import BarsLoader from "../bars-loader.tsx/bars-loader";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/auth/signin");
    },
  });

  return status === "loading" ? (
    <BarsLoader />
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default ProtectRoute;
