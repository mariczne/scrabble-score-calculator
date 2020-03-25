import SCORE_TABLE from "../scoreTable";

export function isLanguageDefined({ scoreTable = SCORE_TABLE, languageCode }) {
  return scoreTable.hasOwnProperty(languageCode);
}

export function getSupportedLanguages(scoreTable = SCORE_TABLE) {
  return Array.from(Object.keys(scoreTable)).map(languageCode => ({
    languageCode,
    displayName: scoreTable[languageCode].displayName
  }));
}
