import { ScoreTable } from "../interfaces";
import {
  sortArrayByLengthDescending,
  joinAllSubarraysIntoSingleElements,
} from "./array";
import { checkIsLanguageDefined } from "./error";

export function isLanguageWithMultigraphs(
  scoreTable: ScoreTable,
  languageCode: string
) {
  checkIsLanguageDefined(scoreTable, languageCode);
  return scoreTable[languageCode].hasOwnProperty("multigraphs");
}

export function getMultigraphsInLanguage(
  scoreTable: ScoreTable,
  languageCode: string
) {
  if (isLanguageWithMultigraphs(scoreTable, languageCode)) {
    return sortArrayByLengthDescending(scoreTable[languageCode].multigraphs!);
  }
  return [];
}

export function processMultigraphs(letters: string[], multigraphs: string[][]) {
  return multigraphs.reduce(
    (letters, multigraph) =>
      (letters = joinAllSubarraysIntoSingleElements(letters, multigraph)),
    letters
  );
}
