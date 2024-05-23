import { icons } from "@/constants";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type Props = {
  buttonLabel: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onClickSearchButton: () => void;
  lgFrameWidth: number;
  lgInputWidth: number;
  disabled?: boolean;
};

const Search = (props: Props) => {
  return (
    <div
      className={`w-full h-[64px] md:w-[500px] lg:w-[${props.lgFrameWidth}px] lg:h-[72px] max-w-full flex items-center justify-between border-[0.8px] border-grey px-4 py-3 rounded-[10px] hover:border-purple hover:border-[1px] `}
    >
      <span className="flex items-center gap-3 ">
        <Image
          src={icons.search}
          alt="search icon"
          className="w-6 h-6 text-lightGrey"
        />

        <input
          type="submit"
          placeholder={props.placeholder}
          className={`lg:w-[${props.lgInputWidth}px] md:w-[300px] min-w-full h-7 outline-none text-lightGrey`}
          onChange={props.onChange}
          value={props.value}
          name="searchTerm"
          id={props.value}
          autoComplete="off"
          disabled={props.disabled}
        />
      </span>

      <button
        type="submit"
        disabled={!props.value}
        onClick={props.onClickSearchButton}
        className="signup_button"
      >
        {props.buttonLabel}
      </button>
    </div>
  );
};

export default Search;
