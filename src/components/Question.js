import React, { useContext } from "react";
import Option from "./Option";
import { useQuizContext } from "../context/useQuizContext";
function Question() {
  const { index, answer, dispatch, questions } = useQuizContext();
  return (
    <div>
      <h4>
        <p>{questions[index].question}</p>
      </h4>
      <Option
        question={questions[index]}
        dispatch={dispatch}
        answer={answer[index]}
      />
    </div>
  );
}

export default Question;
