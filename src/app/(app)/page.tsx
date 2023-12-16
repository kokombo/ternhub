"use client";

import { Faqs, TrendingJobs, Blogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div></div>;
  }

  useEffect(() => {
    const redirectSessionUser = () => {
      if (status === "authenticated" && session?.user) {
        router.replace("/jobs");
      }
    };

    redirectSessionUser();
  }, []);

  return (
    <div>
      <Hero />
      <TrendingJobs />
      <Blogs />
      <Faqs />
    </div>
  );
}
