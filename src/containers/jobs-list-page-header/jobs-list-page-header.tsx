import { Search } from "../../components";

const JobsListPageHeader = () => {
  return (
    <section className="jobs_page_header_wrapper">
      <article className="flex flex-col items-center text-center gap-[18px] md:gap-6">
        <h1 className="text-[34px] leading-[41px] lg:text-[68px] lg:leading-[82px] font-[400]">
          Explore Tech <span className="text-purple">Internships</span>{" "}
          Opportunities
        </h1>

        <p className="text-lg lg:text-2xl font-[400] font-sans ">
          Recommendations are based on your profile, job preferences and
          activities on TheTernHub
        </p>
      </article>

      <Search buttonLabel="Find Job" placeholder="Search job title" />
    </section>
  );
};

export default JobsListPageHeader;
