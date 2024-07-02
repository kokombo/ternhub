"use client";

import { Faqs, TrendingJobs, LandingPageBlogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/jobs");
  }

  return (
    <div className="w-full">
      <Hero />
      <TrendingJobs />
      <LandingPageBlogs />
      <Faqs />
    </div>
  );
};

export default Home;
