import {
  sortArrayByLengthDescending,
  joinAllSubarraysIntoSingleElements
} from "./array";
import { checkIsLanguageDefinedInScoretable } from "./language";

export function isLanguageWithMultigraphs({ scoreTable, languageCode }) {
  checkIsLanguageDefinedInScoretable({ scoreTable, languageCode });
  return scoreTable[languageCode].hasOwnProperty("multigraphs");
}

export function getMultigraphsInLanguage({ scoreTable, languageCode }) {
  if (isLanguageWithMultigraphs({ scoreTable, languageCode })) {
    return sortArrayByLengthDescending([
      ...scoreTable[languageCode].multigraphs
    ]);
  }
  return [];
}

export function processMultigraphs(letters, multigraphs) {
  let lettersCopy = [...letters];

  for (const multigraph of multigraphs) {
    lettersCopy = joinAllSubarraysIntoSingleElements(lettersCopy, multigraph);
  }

  return lettersCopy;
}