import React from "react";

type Props = {
  children: React.ReactNode;
};

const InputFieldError = (props: Props) => {
  return <p className="text-red text-base">{props.children}</p>;
};

export default InputFieldError;
