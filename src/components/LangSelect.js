import React from "react";
import { SCORE_TABLE } from "../modules/scoretable";

export default function LangSelect({
  currentLanguageCode,
  handleLanguageChange
}) {
  function renderLanguageOptions() {
    const options = [];
    for (const languageCode in SCORE_TABLE) {
      const languageDisplayName = SCORE_TABLE[languageCode].displayName;
      options.push(
        <option key={languageCode} value={languageCode}>
          {languageDisplayName}
        </option>
      );
    }
    return options;
  }

  return (
    <div>
      Language:
      <select
        value={currentLanguageCode}
        onChange={handleLanguageChange}
        className="lang-select"
        data-testid="lang-select"
      >
        {renderLanguageOptions()}
      </select>
    </div>
  );
}
