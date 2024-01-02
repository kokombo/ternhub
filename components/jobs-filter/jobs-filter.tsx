"use client";

import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { FilterSelect } from "..";

type Props = {
  onchangeJobModeFilterTerm: (e: ChangeEvent<HTMLSelectElement>) => void;
  jobModeFilterTerm: string;
  onchangeJobTypeFilterTerm: (e: ChangeEvent<HTMLSelectElement>) => void;
  jobTypeFilterTerm: string;
  jobCategoryFilterTerm: string;
  onChangeJobCategoryFilterTerm: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const sortByOptions = [{ key: "Recommended", value: "recommended" }];

const jobModeOptions = [
  { key: "All", value: "all" },
  { key: "Remote", value: "remote" },
  { key: "Onsite", value: "onsite" },
  { key: "Hybrid", value: "hybrid" },
];

const jobTypeOptions = [
  { key: "All", value: "all" },
  { key: "Part-time", value: "part-time" },
  { key: "Full-time", value: "full-time" },
  { key: "Contract", value: "contract" },
];

const jobCategoryOptions = [
  { key: "All", value: "all" },
  { key: "Frontend Development", value: "Frontend Development" },
  { key: "Backend  Development", value: "Backend Development" },
  { key: "Fullstack Development", value: "Fullstack Development" },
  { key: "Product Design", value: "Product Design" },
  { key: "UI/UX", value: "UI/UX" },
  { key: "Product Management", value: "Product Management" },
  { key: "DevOps", value: "DevOps" },
  { key: "Technical Writing", value: "Technical Writing" },
  { key: "Cybersecurity", value: "Cybersecurity" },
  { key: "Mobile Development", value: "Mobile Development" },
  { key: "Others", value: "Others" },
];

const JobsFilter = (props: Props) => {
  return (
    <div className="flex items-center lg:gap-[26px] lg:justify-start gap-3 w-full flex-wrap">
      <FilterSelect
        data={sortByOptions}
        value=""
        onChange={() => {}}
        label="Sort by"
        name=""
      />

      <FilterSelect
        data={jobCategoryOptions}
        value={props.jobCategoryFilterTerm}
        onChange={props.onChangeJobCategoryFilterTerm}
        label="Category"
        name="jobCategoryFilterTerm"
      />

      <FilterSelect
        data={jobModeOptions}
        value={props.jobModeFilterTerm}
        onChange={props.onchangeJobModeFilterTerm}
        label="Mode"
        name="jobModeFilterTerm"
      />

      <FilterSelect
        data={jobTypeOptions}
        value={props.jobTypeFilterTerm}
        onChange={props.onchangeJobTypeFilterTerm}
        label="Type"
        name="jobTypeFilterTerm"
      />
    </div>
  );
};

export default JobsFilter;
