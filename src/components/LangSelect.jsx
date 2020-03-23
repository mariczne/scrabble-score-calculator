import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { getSupportedLanguages } from "../modules/calculator";

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
        onChange={e =>
          dispatch({
            type: "CHANGE_LANGUAGE",
            payload: { language: e.target.value }
          })
        }
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
