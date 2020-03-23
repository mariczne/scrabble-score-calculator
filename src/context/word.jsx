import React, { useReducer, createContext } from "react";
import { SETTINGS } from "../modules/calculator";
import wordReducer from "../reducers/wordReducer";

const BINGO_NAME = "Bingo";

const initialState = {
  input: "",
  language: "eng",
  wordBonuses: [],
  tileBonuses: [],
  isBingoUsed: false
};

export const WordContext = createContext(initialState);

export function WordContextProvider(props) {
  const [state, dispatch] = useReducer(wordReducer, initialState);
  return (
    <WordContext.Provider
      value={{ wordReducer: [state, dispatch], SETTINGS, BINGO_NAME }}
      {...props}
    />
  );
}
