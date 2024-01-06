"use client";

import { useState, useEffect } from "react";

type Props = {
  message: string;
  loading: boolean;
};

const CustomError = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.loading) {
      setErrorMessage("");
    } else {
      setErrorMessage(props.message);
    }
  }, [props.message, props.loading]);

  useEffect(() => {
    const timer = setTimeout(() => setErrorMessage(""), 10000);

    return () => clearTimeout(timer);
  }, [props.message, props.loading]);

  return (
    <>
      <p className="text-red text-sm">{errorMessage}</p>
    </>
  );
};

export default CustomError;
