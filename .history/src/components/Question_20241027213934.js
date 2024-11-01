import React from "react";
import Option from "./Option";
function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>
        <p>{question.question}</p>
      </h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
      <hr />
    </div>
  );
}

export default Question;
