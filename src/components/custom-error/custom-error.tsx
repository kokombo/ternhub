type Props = {
  message: string;
};

const CustomError = (props: Props) => {
  return <p className="text-red text-small">{props.message} </p>;
};

export default CustomError;
