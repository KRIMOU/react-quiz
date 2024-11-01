import React from "react";

export default function FinishedQuiz({
  points,
  maxPoints,
  highscore,
  dispatch,
}) {
  return (
    <>
      <div className="result">
        <h1>Quiz Finished</h1>
        <p>
          You got points <strong>{points}</strong>/{maxPoints}
        </p>
        <p>Pourcentage: {Math.round((points / maxPoints) * 100)}%</p>
        <p>{points === maxPoints ? "🥳" : "😢"} </p>
      </div>
      <div>
        <button className="btn btn-ui">Share</button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart
        </button>
        <p className="highscore">Highscore: {highscore} </p>
      </div>
    </>
  );
}
