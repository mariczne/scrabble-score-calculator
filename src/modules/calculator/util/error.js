import { getTilesInWord } from "../index";
import {
  isBonusDefined,
  isNextBonusAllowed,
  isBingoAllowed,
  totalTimesAnyBonusTypeUsed
} from "./bonus";
import { isLanguageDefined } from "./language";

export function checkIsBonusDefined({ wordScoreMultipliers, bonusType }) {
  if (
    !isBonusDefined({
      wordScoreMultipliers,
      bonusType
    })
  ) {
    throw new RangeError(`No '${bonusType}' bonus type in the score table`);
  }
}

export function checkIsNextBonusAllowed(
  input,
  { languageCode, wordBonuses, tileBonuses }
) {
  if (!isNextBonusAllowed(input, { languageCode, wordBonuses, tileBonuses })) {
    throw new Error();
  }
}

export function checkAreAllBonusesAllowed(
  input,
  { languageCode, wordBonuses, tileBonuses }
) {
  if (
    totalTimesAnyBonusTypeUsed(input, {
      languageCode,
      wordBonuses,
      tileBonuses
    }) > getTilesInWord(input, { languageCode })
  ) {
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
