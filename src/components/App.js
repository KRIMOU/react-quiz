import Header from "./Header";
import { useContext, useEffect, useReducer } from "react";
import Main from "./Main";
import QuestionReducer from "../reducers/QuestionReducer";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishedQuiz from "./FinishedQuiz";
import Timer from "./Timer";
import quizContext from "../context/QuizContext";
import { useQuizContext } from "../context/useQuizContext";

function App() {
  const {
    questions,
    status,
    index,
    points,
    answer,
    highscore,
    timer,
    dispatch,
    maxPoints,
  } = useQuizContext();
  return (
    <div className="App">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}

        {status === "start" && (
          <div>
            /*continue later and delete all props drilling with useContext */
            <Progress data-testid="progress" />
            <Question />
            <Timer />
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
