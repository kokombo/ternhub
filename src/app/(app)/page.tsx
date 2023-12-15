"use client";

import { Faqs, TrendingJobs, Blogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <div></div>
      ) : (
        <div>
          <Hero />
          <TrendingJobs />
          <Blogs />
          <Faqs />
        </div>
      )}
    </>
  );
}
