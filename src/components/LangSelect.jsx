import React, { useContext } from "react";
import { SCORE_TABLE } from "../constants/scoretable";
import { WordContext } from "../context/word";

export default function LangSelect() {
  const languages = Array.from(Object.keys(SCORE_TABLE));
  const [state, dispatch] = useContext(WordContext);

  return (
    <div>
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
        {languages.map(languageCode => {
          return (
            <option key={languageCode} value={languageCode}>
              {SCORE_TABLE[languageCode].displayName}
            </option>
          );
        })}
      </select>
    </div>
  );
}
