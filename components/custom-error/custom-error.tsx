"use client";

type Props = {
  message: string;
  loading?: boolean;
};

const CustomError = (props: Props) => {
  return (
    <>
      <p className="text-red text-sm">{props.message}</p>
    </>
  );
};

export default CustomError;
