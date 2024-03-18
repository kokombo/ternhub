import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Props = {
  message: string | undefined;
  buttonLabel?: string;
  onClickButton?: () => void;
  isError?: boolean;
  illustration: string | StaticImport;
};

const Message = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col items-center pt-32 gap-5  max-w-[80vw] ">
      <div className="block relative h-40 w-40">
        <Image
          src={props.illustration}
          alt={`${props.message} vector illustration.`}
          className=" object-contain"
          priority
          fill
          sizes="any"
          loading="eager"
        />
      </div>

      {props.isError && (
        <p className="text-greyblack text-lg text-center font-semibold">
          {props.message}
        </p>
      )}

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
