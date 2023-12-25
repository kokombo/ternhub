type Props = {
  message: string;
};

const CustomError = (props: Props) => {
  return <p className="text-red text-sm">{props.message} </p>;
};

export default CustomError;
