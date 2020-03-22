import React, { useReducer, createContext } from "react";
import wordReducer from "../reducers/wordReducer";

export const WordContext = createContext();

const initialState = {
  input: "",
  language: "eng",
  wordBonuses: {},
  tileBonuses: {},
  isBingoUsed: false
};

export function WordContextProvider(props) {
  const [state, dispatch] = useReducer(wordReducer, initialState);
  return <WordContext.Provider value={[state, dispatch]} {...props} />;
}
