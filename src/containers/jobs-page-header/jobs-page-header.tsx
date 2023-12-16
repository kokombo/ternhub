import { Search } from "../../components";

const JobsPageHeader = () => {
  return (
    <section className="flex flex-col items-center w-full gap-[34px] md:gap-[50px]">
      <article className="flex flex-col text-center gap-[18px] md:gap-6">
        <h1 className="text-[34px] leading-[41px] lg:text-[68px] lg:leading-[82px] font-[400]">
          Explore Tech <span className="text-purple">Internships</span>{" "}
          Opportunities.
        </h1>

        <p className="text-lg lg:text-2xl font-[400] font-sans ">
          Recommendations are based on your profile, job preferences and
          activities on TheTernHub.
        </p>
      </article>

      <Search buttonLabel="Find Job" />
    </section>
  );
};

export default JobsPageHeader;
