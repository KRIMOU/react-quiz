import { useContext } from "react";
import quizContext from "./QuizContext";

export const useQuizContext = () => {
  const context = useContext(quizContext);
  if (!context) {
    throw new Error("useQMethodContext must be used within a QMethodProvider");
  }
  return context;
};
