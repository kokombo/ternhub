import { NavigationBar, Footer } from "@/containers";
import { Fragment } from "react";
import { getServerSession } from "@/utilities/auth/getServerSession";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <Fragment>
      <NavigationBar session={session} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
