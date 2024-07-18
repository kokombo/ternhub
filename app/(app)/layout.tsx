import "@/styles/globals.css";
import { NavigationBar, Footer } from "@/app/imports";
import { Fragment } from "react";
import { getCurrentServerSession } from "@/utilities/auth/getCurrentServerSession";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getCurrentServerSession();

  return (
    <Fragment>
      <NavigationBar session={session} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
