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
export default function QuestionReducer(state = initialState, action) {
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
