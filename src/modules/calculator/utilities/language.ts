import SCORE_TABLE from "../scoreTable";
import { ScoreTable } from "../interfaces";

export function isLanguageDefined(
  scoreTable: ScoreTable = SCORE_TABLE,
  languageCode: string
) {
  return scoreTable.hasOwnProperty(languageCode);
}

export function getSupportedLanguages(scoreTable: ScoreTable = SCORE_TABLE) {
  return Array.from(Object.keys(scoreTable)).map((languageCode) => ({
    languageCode,
    displayName: scoreTable[languageCode].displayName,
  }));
}
