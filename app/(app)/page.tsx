"use client";

import { Loader } from "@/components";
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
  }, [status, redirect]);

  if (status === "loading") return <Loader />;

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
