import {
  sortArrayByLengthDescending,
  joinAllSubarraysIntoSingleElements,
} from "./array";
import { checkIsLanguageDefined } from "./error";
import { ScoreTable, Multigraph } from "../types";

export function isLanguageWithMultigraphs(
  scoreTable: ScoreTable,
  languageCode: string
): boolean {
  checkIsLanguageDefined(scoreTable, languageCode);
  return Object.values(scoreTable[languageCode].scores).some((score) =>
    score.some((char) => char.length > 1)
  );
}

export function getMultigraphsInLanguage(
  scoreTable: ScoreTable,
  languageCode: string
): Multigraph[] {
  if (isLanguageWithMultigraphs(scoreTable, languageCode)) {
    const multigraphs = Object.values(scoreTable[languageCode].scores)
      .flat()
      .filter((char) => char.length > 1);

    return sortArrayByLengthDescending(multigraphs);
  }
  return [];
}

export function joinMultigraphsInTiles(
  letters: string[],
  multigraphs: Multigraph[]
): string[] {
  return multigraphs.reduce(
    (letters, multigraph) =>
      (letters = joinAllSubarraysIntoSingleElements(
        letters,
        multigraph.split("")
      )),
    letters
  );
}
