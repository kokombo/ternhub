import { illustrations } from "../../constants";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Props = {
  message: string;
  buttonLabel?: string;
  onClickButton?: () => void;
  isError?: boolean;
  vector?: string | StaticImport;
};

const Message = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5 ">
      <Image
        src={illustrations.vector}
        alt={`${props.message} vector illustration.`}
        className="w-full h-96 object-contain"
        priority
      />

      <p className="text-textblack text-base">{props.message}</p>

      {props.isError && (
        <button
          type="button"
          onClick={props.onClickButton}
          className="blue_button"
        >
          {props.buttonLabel}
        </button>
      )}
    </div>
  );
};

export default Message;
