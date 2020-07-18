import { ScoreTable, Bonus } from "../interfaces";
import { getTilesInWord } from "../index";
import { isBonusDefined, isNextBonusAllowed, isBingoAllowed } from "./bonus";
import { isLanguageDefined } from "./language";
import { MIN_TILES_FOR_BINGO } from "../settings";

export function checkIsBonusDefined(multiplier: number): void {
  if (!isBonusDefined(multiplier)) {
    throw new RangeError(`No ${multiplier}x word bonus in the settings`);
  }
}

export function checkIsNextBonusAllowed(
  input: string,
  languageCode: string,
  bonuses: Bonus[]
): void {
  if (!isNextBonusAllowed(getTilesInWord(input, { languageCode }), bonuses)) {
    throw new Error();
  }
}

export function checkAreAllBonusesAllowed(
  input: string,
  languageCode: string,
  bonuses: Bonus[]
): void {
  if (bonuses.length > getTilesInWord(input, { languageCode }).length) {
    throw new Error();
  }
}

export function checkIsBingoAllowed(
  input: string,
  languageCode: string,
  minTilesForBingo: number = MIN_TILES_FOR_BINGO
): void {
  if (!isBingoAllowed(input, languageCode, minTilesForBingo)) {
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
