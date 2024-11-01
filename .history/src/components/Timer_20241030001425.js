import React from "react";
import { useEffect } from "react";
export default function Timer({ time, dispatch, points }) {
  //i want that timer to convert it to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      if (time === 0) {
        dispatch({ type: "last_question", payload: { points } });
      }
      dispatch({ type: "dec_Timer" });
    }, 1000);

    return () => clearInterval(timer);
  });
  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}
