"use client";
import { icons } from "../../constants";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setLocationFilterTerm: Dispatch<SetStateAction<string>>;
};

const JobsFilter = (props: Props) => {
  const handleSelect = (e: any) => {
    props.setLocationFilterTerm(e.target?.value);
  };

  return (
    <div className="flex items-center md:gap-[26px] md:justify-start justify-between w-full">
      <div className="select_container">
        <p className="filter_text">Sort by:</p>

        <div className="select_wrapper ">
          <select name="location" className="select">
            <option value={"recommended"}>Recommended</option>
          </select>

          <Image
            src={icons.arrowdown}
            alt="dropwdown icon"
            height={16}
            width={16}
            className="h-4 w-4 md:h-6 md:w-6"
          />
        </div>
      </div>

      <div className="select_container">
        <p className="filter_text">Location: </p>

        <div className="select_wrapper ">
          <select name="location" onChange={handleSelect} className="select">
            <option value={"all"}>All</option>
            <option value={"remote"}>Remote</option>
            <option value={"onsite"}>Onsite</option>
            <option value={"hybrid"}>Hybrid</option>
          </select>

          <Image
            src={icons.arrowdown}
            alt="dropwdown icon"
            height={16}
            width={16}
            className="h-4 w-4 md:h-6 md:w-6"
          />
        </div>
      </div>
    </div>
  );
};

export default JobsFilter;
