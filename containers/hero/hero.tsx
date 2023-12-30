import { HeroTitle, Tags, Search } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setJobSearchTerm } from "@/redux-toolkit/slices/search";
import { StateType } from "@/redux-toolkit/store";

const Hero = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { jobSearchTerm } = useSelector((store: StateType) => store.search);

  return (
    <section className="hero">
      <HeroTitle />

      <Tags />

      <Search
        buttonLabel="Find"
        placeholder="Search job title"
        onChange={(e) => dispatch(setJobSearchTerm(e.target.value))}
        value={jobSearchTerm}
        onClickSearchButton={() => router.push("/search/jobs")}
        lgFrameWidth={458}
        lgInputWidth={250}
      />
    </section>
  );
};

export default Hero;
