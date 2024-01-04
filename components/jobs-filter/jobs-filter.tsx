"use client";

import { ChangeEvent } from "react";
import { FilterSelect } from "..";
import { jobCategoryOptions } from "@/constants/data";

type Props = {
  onchangeJobModeFilterTerm: (e: ChangeEvent<HTMLSelectElement>) => void;
  jobModeFilterTerm: string;
  onchangeJobTypeFilterTerm: (e: ChangeEvent<HTMLSelectElement>) => void;
  jobTypeFilterTerm: string;
  jobCategoryFilterTerm: string;
  onChangeJobCategoryFilterTerm: (e: ChangeEvent<HTMLSelectElement>) => void;
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

const JobsFilter = (props: Props) => {
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
        value={props.jobModeFilterTerm}
        onChange={props.onchangeJobModeFilterTerm}
        label="Mode"
        name="jobModeFilterTerm"
        firstOptionKey="All"
        firstOptionValue="all"
      />

      <FilterSelect
        data={jobTypeOptions}
        value={props.jobTypeFilterTerm}
        onChange={props.onchangeJobTypeFilterTerm}
        label="Type"
        name="jobTypeFilterTerm"
        firstOptionKey="All"
        firstOptionValue="all"
      />

      <FilterSelect
        data={jobCategoryOptions}
        value={props.jobCategoryFilterTerm}
        onChange={props.onChangeJobCategoryFilterTerm}
        label="Category"
        name="jobCategoryFilterTerm"
        firstOptionKey="All"
        firstOptionValue="all"
      />
    </div>
  );
};

export default JobsFilter;
