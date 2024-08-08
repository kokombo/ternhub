import "@/styles/globals.css";
import { NavigationBar, Footer } from "@/app/imports";
import { Fragment } from "react";
import { getServerSession } from "@/utilities/auth/getServerSession";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <Fragment>
      <NavigationBar session={session} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
