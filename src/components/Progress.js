import React, { useContext } from "react";
import { useQuizContext } from "../context/useQuizContext";

export default function Progress() {
  const { questions, index, points, answer } = useQuizContext();
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
