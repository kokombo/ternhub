import "../../styles/globals.css";
import { AdminSegmentNavbar } from "@/containers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AdminSegmentNavbar />

      {children}
    </section>
  );
}
