"use client";

import { BarsLoader } from "@/components";
import { Faqs, TrendingJobs, LandingPageBlogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/jobs");
    }
  }, [status]);

  if (status === "loading") return <BarsLoader />;

  if (status === "unauthenticated")
    return (
      <div className="flex flex-col w-full">
        <Hero />
        <TrendingJobs />
        <LandingPageBlogs />
        <Faqs />
      </div>
    );
}
