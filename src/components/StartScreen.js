function StartScreen({ numberQuestions, dispatch }) {
  return (
    <div className="start">
      <h1>React Quiz</h1>
      <h3>
        Start the quiz , {numberQuestions} questions to test your React mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
