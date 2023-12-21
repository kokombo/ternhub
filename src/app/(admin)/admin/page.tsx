"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Admin = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  //   useEffect(() => {
  //     if (session?.user.role !== "admin") {
  //       router.push("/");
  //     }
  //   }, [status]);

  return <div>Admin</div>;
};

export default Admin;
