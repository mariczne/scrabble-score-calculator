export function checkIsLanguageDefinedInScoretable(language) {
  if (!isLanguageDefinedInScoretable(language)) {
    throw new RangeError("Unsupported language");
  }
}

export function isLanguageDefinedInScoretable({ scoreTable, languageCode }) {
  return scoreTable.hasOwnProperty(languageCode);
}
