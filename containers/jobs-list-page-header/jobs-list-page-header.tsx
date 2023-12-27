"use client";
import { Search } from "@/components";
import { Grotesk } from "@/app/font";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { setJobSearchTerm } from "@/redux-toolkit/slices/search";
import { useRouter } from "next/navigation";

const JobsListPageHeader = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { jobSearchTerm } = useSelector((store: StateType) => store.search);

  return (
    <section className="jobs_page_header_wrapper">
      <article className="flex flex-col items-center text-center gap-[18px] md:gap-6">
        <h1
          className="text-[34px] leading-[41px] lg:text-[68px] lg:leading-[82px]"
          style={Grotesk.style}
        >
          Explore Tech <span className="text-purple">Internships</span>{" "}
          Opportunities
        </h1>

        <h2 className="text-lg lg:text-2xl font-sans text-greyblack">
          Recommendations are based on your profile, job preferences and
          activities on TheTernHub
        </h2>
      </article>

      <Search
        buttonLabel="Find Job"
        placeholder="Search job title"
        onChange={(e) => dispatch(setJobSearchTerm(e.target.value))}
        value={jobSearchTerm}
        onClickSearchButton={() => router.push("/search/jobs")}
        lgFrameWidth="556px"
        lgInputWidth="300px"
      />
    </section>
  );
};

export default JobsListPageHeader;
