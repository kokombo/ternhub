import {
  Hero,
  TrendingJobs,
  LandingPageBlogs,
  Faqs,
} from "@/app/client-components-import";

const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <TrendingJobs />
      <LandingPageBlogs />
      <Faqs />
    </main>
  );
};

export default Home;
