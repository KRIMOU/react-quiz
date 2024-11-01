import React from "react";

export default function Progress({ questions, index, answer, points }) {
  return (
    <div>
      <progress
        max={questions.length}
        value={index + Number(answer !== undefined)}
      />
      <div className="progress">
        <span>
          Question <strong> {index + 1} </strong>/{questions.length}
        </span>
        <span>
          points:<strong>{points}</strong>/
          {questions.reduce((total, question) => total + question.points, 0)}
        </span>
      </div>
    </div>
  );
}
