import { getTilesInWord } from "../index";
import { isBonusDefined, isNextBonusAllowed, isBingoAllowed } from "./bonus";
import { isLanguageDefined } from "./language";

export function checkIsBonusDefined(multiplier) {
  if (!isBonusDefined(multiplier)) {
    throw new RangeError(`No ${multiplier}x word bonus in the score table`);
  }
}

export function checkIsNextBonusAllowed(input, { languageCode, bonuses }) {
  if (!isNextBonusAllowed(getTilesInWord(input, { languageCode }), bonuses)) {
    throw new Error();
  }
}

export function checkAreAllBonusesAllowed(input, { languageCode, bonuses }) {
  if (bonuses.length > getTilesInWord(input, { languageCode }).length) {
    throw new Error();
  }
}

export function checkIsBingoAllowed(input, { languageCode, minTilesForBingo }) {
  if (!isBingoAllowed(input, { languageCode, minTilesForBingo })) {
    throw new Error();
  }
}

export function checkIsLanguageDefined(language) {
  if (!isLanguageDefined(language)) {
    throw new RangeError("Unsupported language");
  }
}
