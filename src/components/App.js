import Header from "./Header";
import { useEffect, useReducer } from "react";
import Main from "./Main";
import QuestionReducer from "../reducers/QuestionReducer";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishedQuiz from "./FinishedQuiz";
import Timer from "./Timer";

function App() {
  const [
    { questions, status, index, points, answer, highscore, timer },
    dispatch,
  ] = useReducer(QuestionReducer, {
    questions: [],
    status: "loading",
    index: 0,
    points: 0,
    answer: [],
    highscore: 0,
    timer: 10,
  });
  useEffect(() => {
    fetchQuestions();
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Fetches the questions from the server and updates the state
     * with the result. If the request fails, it updates the state
     * with an error.
     */
    /******  1611e702-f41d-443d-9f41-291219da10b9  *******/
    function fetchQuestions() {
      fetch("http://localhost:8000/questions")
        .then((response) => response.json())
        .then((data) => dispatch({ type: "test", payload: data }))
        .catch((e) => dispatch({ type: "error" }));
    }
  }, []);

  const maxPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  return (
    <div className="App">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numberQuestions={questions.length} dispatch={dispatch} />
        )}

        {status === "start" && (
          <div>
            <Progress
              data-testid="progress"
              questions={questions}
              index={index}
              answer={answer[index]}
              points={points}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer[index]}
            />
            <Timer time={timer} dispatch={dispatch} points={points} />
            <button
              className="btn btn-ui"
              onClick={() => {
                index === questions.length - 1
                  ? dispatch({ type: "last_question", payload: { points } })
                  : dispatch({ type: "next_question" });
              }}
            >
              Next Question
            </button>
            <button
              disabled={index === 0}
              className="btn btn-ui"
              onClick={() => {
                dispatch({ type: "prev_question" });
              }}
            >
              Previous Question
            </button>
          </div>
        )}
        {status === "finished" && (
          <div>
            <FinishedQuiz
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          </div>
        )}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
