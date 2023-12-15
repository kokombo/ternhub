import Image from "next/image";
import { StaticImageData } from "next/image";

type Props = {
  onClick: () => void;
  icon: StaticImageData;
  label: string;
  authName: string;
};

const SocialAuthFrame = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="px-8 py-4 flex items-center justify-center gap-2 border-[1px] border-purple rounded-[10px] w-full "
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
