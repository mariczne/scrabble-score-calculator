import { isLanguageDefined } from "./language";
import { MIN_TILES_FOR_BINGO } from "../settings";
import { ScoreTable, Bonus } from "../types";

export function checkAreAllBonusesAllowed(
  tilesInWord: string[],
  bonuses: Bonus[]
): void {
  if (bonuses.length > tilesInWord.length) {
    throw new Error();
  }
}

export function checkIsBingoAllowed(
  tilesInWord: string[],
  minTilesForBingo: number = MIN_TILES_FOR_BINGO
): void {
  if (!isBingoAllowed(tilesInWord, minTilesForBingo)) {
    throw new Error();
  }
}

export function checkIsLanguageDefined(
  scoreTable: ScoreTable,
  languageCode: string
): void {
  if (!isLanguageDefined(scoreTable, languageCode)) {
    throw new RangeError("Unsupported language");
  }
}

export const isBingoAllowed = (
  tilesInWord: string[],
  minTilesForBingo: number = MIN_TILES_FOR_BINGO
): boolean => {
  return tilesInWord.length >= minTilesForBingo;
};
