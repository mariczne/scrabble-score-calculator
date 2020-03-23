import SCORE_TABLE from "../scoreTable";

export function checkIsLanguageDefined(language) {
  if (!isLanguageDefined(language)) {
    throw new RangeError("Unsupported language");
  }
}

export function isLanguageDefined({ scoreTable = SCORE_TABLE, languageCode }) {
  return scoreTable.hasOwnProperty(languageCode);
}

export function getSupportedLanguages(scoreTable = SCORE_TABLE) {
  return Array.from(Object.keys(scoreTable)).map(language => ({
    code: language,
    displayName: scoreTable[language].displayName
  }));
}
