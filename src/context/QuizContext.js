const { createContext } = require("react");

const quizContext = createContext();

if (quizContext == null) throw new Error("Erreur de creation useContext");

export default quizContext;
