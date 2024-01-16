import { useState } from "react";
import parse from "html-react-parser";
import { BiMinus, BiPlus, BiEdit } from "react-icons/bi";
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

  const showAndHideAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const showEditIcon = Boolean(pathname === "/admin/faqs");

  return (
    <div
      className={`${
        showEditIcon ? "flex items-start gap-1" : ""
      } w-[629px] max-w-full `}
    >
      <div
        onClick={showAndHideAnswer}
        data-testid="faq-card"
        className="flex flex-col gap-4 border-grey bg-white border-[0.8px] rounded-[10px] w-full p-6"
      >
        <div className="flex justify-between">
          <h4 className="lg:text-lg text-base font-semibold tracking-[1%] text-textblack flex-wrap">
            {faq.question}
          </h4>

          <button type="button">{showAnswer ? <BiMinus /> : <BiPlus />}</button>
        </div>

        <div className={`${showAnswer ? "block" : "hidden"}`}>
          <span className=" lg:text-lg text-base font-normal tracking-[1%] text-greyblack">
            {parse(faq.answer)}
          </span>
        </div>
      </div>

      {showEditIcon && (
        <button
          type="button"
          data-testid="edit-faq-button"
          onClick={() => onClickFaqEditButton(faq._id)}
          className="text-2xl text-textblack"
        >
          <BiEdit />
        </button>
      )}
    </div>
  );
};

export default FaqCard;
