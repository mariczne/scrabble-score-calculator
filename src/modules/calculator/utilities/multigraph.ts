import { ScoreTable, Multigraph } from "../interfaces";
import {
  sortArrayByLengthDescending,
  joinAllSubarraysIntoSingleElements,
} from "./array";
import { checkIsLanguageDefined } from "./error";

export function isLanguageWithMultigraphs(
  scoreTable: ScoreTable,
  languageCode: string
): boolean {
  checkIsLanguageDefined(scoreTable, languageCode);
  return scoreTable[languageCode].hasOwnProperty("multigraphs");
}

export function getMultigraphsInLanguage(
  scoreTable: ScoreTable,
  languageCode: string
): Multigraph[] {
  if (isLanguageWithMultigraphs(scoreTable, languageCode)) {
    return sortArrayByLengthDescending(scoreTable[languageCode].multigraphs!);
  }
  return [];
}

export function joinMultigraphsInTiles(
  letters: string[],
  multigraphs: Multigraph[]
): string[] {
  return multigraphs.reduce(
    (letters, multigraph) =>
      (letters = joinAllSubarraysIntoSingleElements(letters, multigraph)),
    letters
  );
}
