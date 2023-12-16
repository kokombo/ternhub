"use client";

import { Faqs, TrendingJobs, Blogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  return (
    <div>
      {session?.user ? (
        <div>
          <p> {session.user.name} logged in</p>
        </div>
      ) : (
        <div>
          <Hero />
          <TrendingJobs />
          <Blogs />
          <Faqs />
        </div>
      )}
    </div>
  );
}
