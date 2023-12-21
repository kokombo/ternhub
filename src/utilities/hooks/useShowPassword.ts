"use client";
import { useState } from "react";

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onClickIcon = () => {
    setShowPassword((prev) => !prev);
  };

  return { showPassword, onClickIcon };
};

export default useShowPassword;
