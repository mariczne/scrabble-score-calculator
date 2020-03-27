import {
  sortArrayByLengthDescending,
  joinAllSubarraysIntoSingleElements
} from "./array";
import { checkIsLanguageDefined } from "./error";

export function isLanguageWithMultigraphs({ scoreTable, languageCode }) {
  checkIsLanguageDefined({ scoreTable, languageCode });
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
  return multigraphs.reduce(
    (letters, multigraph) =>
      (letters = joinAllSubarraysIntoSingleElements(letters, multigraph)),
    letters
  );
}
