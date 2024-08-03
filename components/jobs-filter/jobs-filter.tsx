import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FilterSelect } from "..";
import { jobCategoryOptions } from "@/constants/data";

type Props = {
  jobModeFilterTerm: string;
  jobTypeFilterTerm: string;
  jobCategoryFilterTerm: string;
  setQueryTerms: Dispatch<SetStateAction<QueryTerms>>;
};

const sortByOptions = [{ key: "", value: "" }];

const jobModeOptions = [
  { key: "Remote", value: "remote" },
  { key: "Onsite", value: "onsite" },
  { key: "Hybrid", value: "hybrid" },
];

const jobTypeOptions = [
  { key: "Part-time", value: "part-time" },
  { key: "Full-time", value: "full-time" },
  { key: "Contract", value: "contract" },
];

const JobsFilter = ({
  setQueryTerms,
  jobCategoryFilterTerm,
  jobModeFilterTerm,
  jobTypeFilterTerm,
}: Props) => {
  const filterTermOnchange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center lg:gap-[26px] lg:justify-start gap-[13px] w-full flex-wrap">
      <FilterSelect
        data={sortByOptions}
        value="recommended"
        onChange={() => {}}
        label="Sort by"
        name=""
        firstOptionKey="Recommended"
        firstOptionValue="recommended"
      />

      <FilterSelect
        data={jobModeOptions}
        value={jobModeFilterTerm}
        onChange={filterTermOnchange}
        label="Mode"
        name="jobModeFilterTerm"
        firstOptionKey="All"
        firstOptionValue="all"
      />

      <FilterSelect
        data={jobTypeOptions}
        value={jobTypeFilterTerm}
        onChange={filterTermOnchange}
        label="Type"
        name="jobTypeFilterTerm"
        firstOptionKey="All"
        firstOptionValue="all"
      />

      <FilterSelect
        data={jobCategoryOptions}
        value={jobCategoryFilterTerm}
        onChange={filterTermOnchange}
        label="Category"
        name="jobCategoryFilterTerm"
        firstOptionKey="All"
        firstOptionValue="all"
      />
    </div>
  );
};

export default JobsFilter;
