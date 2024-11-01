function Option({ question, dispatch, answer }) {
  const checkAnswer = (index) => {
    if (question.correctOption === index) {
      dispatch({
        type: "correct_answer",
        payload: { points: question.points, answer: index },
      });
    } else {
      dispatch({
        type: "correct_answer",
        payload: { answer: index, points: 0 },
      });
    }
  };

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`
            btn btn-option ${answer === index ? "answer" : ""}
                          ${
                            answer !== null &&
                            answer !== undefined &&
                            question.correctOption === index
                              ? "correct"
                              : "wrong"
                          }`}
          key={option}
          disabled={answer !== null && answer !== undefined}
          onClick={() => checkAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
