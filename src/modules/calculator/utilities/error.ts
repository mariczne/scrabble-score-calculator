import { ScoreTable } from "../interfaces";
import { getTilesInWord } from "../index";
import { isBonusDefined, isNextBonusAllowed, isBingoAllowed } from "./bonus";
import { isLanguageDefined } from "./language";
import { MIN_TILES_FOR_BINGO } from "../settings";

export function checkIsBonusDefined(multiplier: number) {
  if (!isBonusDefined(multiplier)) {
    throw new RangeError(`No ${multiplier}x word bonus in the score table`);
  }
}

export function checkIsNextBonusAllowed(
  input: string,
  languageCode: string,
  bonuses: []
) {
  if (!isNextBonusAllowed(getTilesInWord(input, { languageCode }), bonuses)) {
    throw new Error();
  }
}

export function checkAreAllBonusesAllowed(
  input: string,
  languageCode: string,
  bonuses: []
) {
  if (bonuses.length > getTilesInWord(input, { languageCode }).length) {
    throw new Error();
  }
}

export function checkIsBingoAllowed(
  input: string,
  languageCode: string,
  minTilesForBingo: number = MIN_TILES_FOR_BINGO
) {
  if (!isBingoAllowed(input, languageCode, minTilesForBingo)) {
    throw new Error();
  }
}

export function checkIsLanguageDefined(
  scoreTable: ScoreTable,
  languageCode: string
) {
  if (!isLanguageDefined(scoreTable, languageCode)) {
    throw new RangeError("Unsupported language");
  }
}
