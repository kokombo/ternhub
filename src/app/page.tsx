import {
  Hero,
  TrendingJobs,
  LandingPageBlogs,
  Faqs,
  NavigationBar,
  Footer,
} from "@/containers";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession();

  return (
    <main className="w-full">
      <NavigationBar session={session} />
      <Hero />
      <TrendingJobs />
      <LandingPageBlogs />
      <Faqs />
      <Footer />
    </main>
  );
};

export default Home;
