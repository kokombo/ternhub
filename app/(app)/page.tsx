"use client";

import { Loader } from "@/components";
import { Faqs, TrendingJobs, LandingPageBlogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <Loader />;
  } else if (status === "authenticated") {
    redirect("/jobs");
  } else {
    return (
      <div className="flex flex-col w-full">
        <Hero />
        <TrendingJobs />
        <LandingPageBlogs />
        <Faqs />
      </div>
    );
  }
}
