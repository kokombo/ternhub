"use client";

import { useState } from "react";
import parse from "html-react-parser";
import { BiMinus, BiPlus, BiEdit } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const FaqCard = ({
  props: faq,
  onClickFaqEditButton,
}: {
  props: FaqType;
  onClickFaqEditButton: (id: string) => void;
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const pathname = usePathname();

  const { data: session } = useSession();

  const showAndHideAsnwer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className="flex items-start gap-1">
      <div
        onClick={showAndHideAsnwer}
        className="flex flex-col gap-4 border-grey bg-white border-[0.8px] rounded-[10px] w-[629px] max-w-full p-6"
      >
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold tracking-[1%] text-textblack ">
            {faq.question}
          </h4>

          <button type="button">{showAnswer ? <BiMinus /> : <BiPlus />}</button>
        </div>

        {showAnswer && (
          <div
            className={`${
              showAnswer ? "translate-y-0" : "translate-y-[100%]"
            } transition-all duration-200`}
          >
            <p className="text-sm lg:text-lg font-normal tracking-[1%] text-greyblack">
              {parse(faq.answer)}
            </p>
          </div>
        )}
      </div>

      {pathname === "/admin/faqs" && session?.user.role === "admin" ? (
        <button
          type="button"
          onClick={() => onClickFaqEditButton(faq._id)}
          className="text-2xl text-textblack"
        >
          <BiEdit />
        </button>
      ) : null}
    </div>
  );
};

export default FaqCard;
