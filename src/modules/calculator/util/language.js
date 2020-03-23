import SCORE_TABLE from "../constants/scoreTable";

export function checkIsLanguageDefinedInScoretable(language) {
  if (!isLanguageDefinedInScoretable(language)) {
    throw new RangeError("Unsupported language");
  }
}

export function isLanguageDefinedInScoretable({
  scoreTable = SCORE_TABLE,
  languageCode
}) {
  return scoreTable.hasOwnProperty(languageCode);
}

export function getSupportedLanguages(scoreTable = SCORE_TABLE) {
  return Array.from(Object.keys(scoreTable)).map(language => ({
    code: language,
    displayName: scoreTable[language].displayName
  }));
}
