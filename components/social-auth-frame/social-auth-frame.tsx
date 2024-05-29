import Image from "next/image";
import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick: () => void;
  icon: StaticImageData;
  label: string;
  authName: string;
  disabled: boolean;
};

const SocialAuthFrame = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={twMerge(
        "px-8 py-4 flex items-center justify-center gap-2 border-[1px] border-purple rounded-[10px] w-full",
        props.disabled && "cursor-not-allowed"
      )}
      disabled={props.disabled}
    >
      <Image
        src={props.icon}
        alt={`${props.authName} icon`}
        height={24}
        width={24}
      />

      <p className="text-purple text-base font-semibold tracking-[1%]">
        <span>{props.label}</span> with {props.authName}
      </p>
    </button>
  );
};

export default SocialAuthFrame;
