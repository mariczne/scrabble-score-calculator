import SCORE_TABLE from "../scoreTable";
import { ScoreTable, Language } from "../types";

export function isLanguageDefined(
  scoreTable: ScoreTable = SCORE_TABLE,
  languageCode: string
): boolean {
  return scoreTable.hasOwnProperty(languageCode);
}

export function getSupportedLanguages(
  scoreTable: ScoreTable = SCORE_TABLE
): Language[] {
  return Array.from(Object.keys(scoreTable)).map((languageCode) => ({
    languageCode,
    displayName: scoreTable[languageCode].displayName,
  }));
}
