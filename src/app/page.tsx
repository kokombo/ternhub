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
    <div className="w-full">
      <NavigationBar session={session} />
      <Hero />
      <TrendingJobs />
      <LandingPageBlogs />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Home;
