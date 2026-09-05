import { formatTime } from "@/src/shared/utils/formatTime";
import { useEffect, useState } from "react";

export function useCountdown(initialSeconds: number = 60) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const resetTimer = () => setSeconds(initialSeconds);

  return {
    remainingTime: formatTime(seconds),
    resetTimer,
    isExpired: seconds <= 0,
    seconds,
  };
}
