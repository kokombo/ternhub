"use client";
import { icons } from "@/constants";
import Image from "next/image";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

type Props = {
  setLocationFilterTerm: Dispatch<SetStateAction<string>>;
  locationFilterTerm: string;
};

const JobsFilter = (props: Props) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    props.setLocationFilterTerm(e.target?.value);

  return (
    <div className="flex items-center lg:gap-[26px] lg:justify-start justify-between w-full">
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
          <select
            name="location"
            value={props.locationFilterTerm}
            onChange={handleSelect}
            className="select"
          >
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
