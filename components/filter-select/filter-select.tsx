import Image from "next/image";
import { icons } from "@/constants";
import { ChangeEvent } from "react";

type Option = {
  value: string;
  key: string;
};

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: Option[];
  label: string;
  name: string;
};

const FilterSelect = (props: Props) => {
  return (
    <div className="select_container">
      <span>
        <p className="filter_text">{props.label}: </p>
      </span>

      <div className="select_wrapper ">
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className="select"
        >
          {props.data.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.key}
              </option>
            );
          })}
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
  );
};

export default FilterSelect;
