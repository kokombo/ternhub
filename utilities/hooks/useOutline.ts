"use client";

import { useState } from "react";

const useOutline = () => {
  const [outline, setOutline] = useState(false);

  const showOutline = () => {
    setOutline(true);
  };

  const closeOutline = () => {
    setOutline(false);
  };

  return { outline, showOutline, closeOutline };
};

export default useOutline;
