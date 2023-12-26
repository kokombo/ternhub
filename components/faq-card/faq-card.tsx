"use client";
import { useState } from "react";
import parse from "html-react-parser";
import { BiMinus, BiPlus } from "react-icons/bi";

const FaqCard = ({ props }: { props: FaqType }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-4 border-grey bg-white border-[0.8px] rounded-[10px] w-[629px] max-w-full p-6"
    >
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold tracking-[1%] text-textblack ">
          {props.question}
        </h4>

        <button type="button">{showAnswer ? <BiMinus /> : <BiPlus />}</button>
      </div>

      {showAnswer && (
        <div
          className={`${
            showAnswer ? "translate-y-0" : "translate-y-[100%]"
          } transition-all duration-200`}
        >
          <p className="text-lg font-normal tracking-[1%] text-greyblack">
            {parse(props.answer)}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqCard;
