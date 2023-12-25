import { Search } from "../../components";
import { Grotesk } from "../../app/font";

const JobsListPageHeader = () => {
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
        onChange={() => {}}
        value=""
        onClickSearchButton={() => {}}
      />
    </section>
  );
};

export default JobsListPageHeader;
