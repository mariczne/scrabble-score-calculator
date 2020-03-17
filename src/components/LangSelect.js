import React from "react";
import PropTypes from "prop-types";
import { SCORE_TABLE } from "../modules/scoretable";

export default function LangSelect({
  currentLanguageCode,
  handleLanguageChange
}) {
  const languages = Array.from(Object.keys(SCORE_TABLE));

  return (
    <div>
      Language:
      <select
        value={currentLanguageCode}
        onChange={handleLanguageChange}
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

LangSelect.propTypes = {
  currentLanguageCode: PropTypes.string,
  handleLanguageChange: PropTypes.func
};

LangSelect.defaultProps = {
  currentLanguageCode: "eng",
  handleLanguageChange: () => {}
};
