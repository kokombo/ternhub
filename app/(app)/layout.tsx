import "@/styles/globals.css";

import { NavAndSidebarWrapper, Footer } from "../(components)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between">
      <NavAndSidebarWrapper />

      <div className="min-h-screen">{children}</div>

      <Footer />
    </div>
  );
}
