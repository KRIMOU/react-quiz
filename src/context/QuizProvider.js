import quizContext from "./QuizContext";
import { useEffect, useReducer } from "react";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: [],
  highscore: 0,
  timer: null,
};
const SECS_PER_QUESTION = 30;

function reducerQuestion(state = initialState, action) {
  switch (action.type) {
    case "test":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        timer: state.questions.length * SECS_PER_QUESTION,
      };
    case "correct_answer":
      return {
        ...state,
        points: state.points + action.payload.points,
        answer: [...state.answer, action.payload.answer],
      };
    case "next_question":
      return {
        ...state,
        index:
          state.index === state.questions.length - 1
            ? state.questions.length
            : state.index + 1,
      };
    case "prev_question":
      return { ...state, index: state.index === 0 ? 0 : state.index - 1 };
    case "last_question":
      return {
        ...state,
        timer: 10,
        status: "finished",
        highscore:
          action.payload.points > state.highscore
            ? action.payload.points
            : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        index: 0,
        points: 0,
        answer: [],
        highscore: 0,
      };
    case "dec_Timer":
      return {
        ...state,
        timer: state.timer - 1,
      };

    default:
      throw new Error("Unexpected action");
  }
}

export const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, points, answer, highscore, timer },
    dispatch,
  ] = useReducer(reducerQuestion, initialState);
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
    <quizContext.Provider
      value={{
        questions: questions,
        status: status,
        index: index,
        points: points,
        answer: answer,
        highscore: highscore,
        timer: timer,
        dispatch: dispatch,
        maxPoints: maxPoints,
      }}
    >
      {children}
    </quizContext.Provider>
  );
};
