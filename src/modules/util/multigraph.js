import {
  sortArrayByLengthDescending,
  findIndexOfSubarray,
  joinSubarrayIntoSingleElement
} from "./array";
import { checkIsLanguageDefinedInScoretable } from "./language";

export function isLanguageWithMultigraphs({ scoreTable, languageCode }) {
  checkIsLanguageDefinedInScoretable({ scoreTable, languageCode });
  return scoreTable[languageCode].hasOwnProperty("multigraphs");
}

export function getMultigraphsInLanguage({ scoreTable, languageCode }) {
  if (isLanguageWithMultigraphs({ scoreTable, languageCode })) {
    return [...scoreTable[languageCode].multigraphs];
  }
  return [];
}

export function processMultigraphs(letters, language) {
  let multigraphs = getMultigraphsInLanguage(language);
  multigraphs = sortArrayByLengthDescending(multigraphs);
  let lettersCopy = [...letters];

  multigraphs.forEach(multigraph => {
    let isMultigraphFound = findIndexOfSubarray(lettersCopy, multigraph) !== -1;
    while (isMultigraphFound) {
      lettersCopy = joinSubarrayIntoSingleElement(lettersCopy, multigraph);
      isMultigraphFound = findIndexOfSubarray(lettersCopy, multigraph) !== -1;
    }
  });

  return lettersCopy;
}
