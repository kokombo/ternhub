import { HeroTitle, Tags, Search } from "@/components";

const Hero = () => {
  return (
    <section className="hero">
      <HeroTitle />

      <Tags />

      <Search
        buttonLabel="Search Job"
        placeholder="Search job title"
        onChange={() => {}}
        value=""
        onClickSearchButton={() => {}}
      />
    </section>
  );
};

export default Hero;
