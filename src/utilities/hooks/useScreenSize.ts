"use client";

import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreeenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreeenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSize };
};

export default useScreenSize;
