import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { getSupportedLanguages } from "../modules/calculator";
import { changeLanguage } from "../actions/word";

const languages = getSupportedLanguages();

export default function LangSelect() {
  const {
    wordReducer: [state, dispatch]
  } = useContext(WordContext);

  return (
    <>
      Language:
      <select
        value={state.language}
        onChange={e => dispatch(changeLanguage(e.target.value))}
        className="lang-select"
        data-testid="lang-select"
      >
        {languages.map(language => {
          return (
            <option key={language.code} value={language.code}>
              {language.displayName}
            </option>
          );
        })}
      </select>
    </>
  );
}
