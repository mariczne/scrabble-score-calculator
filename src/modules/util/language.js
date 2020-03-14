export function checkIsLanguageDefinedInScoretable({ scoreTable, languageCode }) {
  if (!isLanguageDefinedInScoretable({ scoreTable, languageCode })) {
    throw new RangeError("Unsupported language");
  }
}

export function isLanguageDefinedInScoretable({ scoreTable, languageCode }) {
  return scoreTable.hasOwnProperty(languageCode);
}
