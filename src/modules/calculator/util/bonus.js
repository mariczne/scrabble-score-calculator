import { WORD_SCORE_MULTIPLIERS, MINIMUM_LETTERS_FOR_BINGO } from "../settings";
import { getTilesInWord } from "../index";
import { checkIsBonusDefined } from "./error";

export const getTileBonuses = bonuses => {
  return bonuses.filter(bonus => bonus.type === "tile");
};

export const getWordBonuses = bonuses => {
  return bonuses.filter(bonus => bonus.type === "word");
};

export const getWordMultiplier = (wordBonuses = []) => {
  return wordBonuses.reduce((totalMultiplier, bonus) => {
    checkIsBonusDefined(bonus.multiplier);
    return totalMultiplier * bonus.multiplier;
  }, 1);
};

export function getWordBonusTypes(
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) {
  return wordScoreMultipliers.map(bonus => bonus.name);
}

export function isBonusDefined(
  multiplier,
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) {
  return wordScoreMultipliers.some(bonus => bonus.multiplier === multiplier);
}

export const isNextBonusAllowed = (input, { languageCode, bonuses = [] }) => {
  // possibly move higher up the chain?
  const tiles = getTilesInWord(input, { languageCode });
  return tiles.length > bonuses.length;
};

export const isBingoAllowed = (
  input,
  { languageCode, minTilesForBingo = MINIMUM_LETTERS_FOR_BINGO }
) => {
  return getTilesInWord(input, { languageCode }).length >= minTilesForBingo;
};
