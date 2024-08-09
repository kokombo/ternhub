type Props = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

const SubmitButton = (props: Props) => {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${
        props.disabled ? " bg-grey" : "bg-purple  hover:bg-blue"
      } text-white  text-base py-4 px-8 rounded-[10px] w-full`}
    >
      {props.label}
    </button>
  );
};

export default SubmitButton;
