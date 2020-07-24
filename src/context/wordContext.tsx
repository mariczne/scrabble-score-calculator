import React, { useReducer, createContext } from "react";
import { SETTINGS } from "../modules/calculator";
import wordReducer, { State } from "../reducers/wordReducer";

const BINGO_NAME = "Bingo";

const initialState: State = {
  input: "",
  language: "eng",
  bonuses: [],
  isBingoUsed: false,
};

export const WordContext = createContext<any>(initialState); // TODO

export const WordContextProvider: React.FC = function ({ children }) {
  const [state, dispatch] = useReducer(wordReducer, initialState);
  return (
    <WordContext.Provider
      value={{ wordReducer: [state, dispatch], SETTINGS, BINGO_NAME }}
    >
      {children}
    </WordContext.Provider>
  );
};
