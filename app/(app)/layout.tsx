import "@/styles/globals.css";
import { NavigationBar, Footer } from "@/app/client-components-import";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavigationBar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
