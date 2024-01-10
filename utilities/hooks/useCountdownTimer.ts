import { useState, useEffect } from "react";

export const useCountdownTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);

  const formatTime = ({ time }: { time: number }) => {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const newTime = formatTime({ time });

  return { newTime, setTime };
};
