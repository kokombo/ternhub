"use client";
import { Faqs, TrendingJobs, LandingPageBlogs, Hero } from "@/containers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  console.log("user", session?.user);

  useEffect(() => {
    if (session?.user) {
      router.replace("/jobs");
    }
  }, [status]);

  if (status === "loading") return <div className="h-[1500px]"></div>;

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
