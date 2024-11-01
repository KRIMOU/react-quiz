import React from "react";
import { useEffect } from "react";
export default function Timer({ time, dispatch, points }) {
  /*i want use effect to count time down*/
  useEffect(() => {
    const timer = setInterval(() => {
      if (time === 0) {
        dispatch({ type: "last_question", payload: { points } });
      }
      dispatch({ type: "dec_Timer" });
    }, 1000);

    return () => clearInterval(timer);
  });
  return <div className="timer">{time}</div>;
}
