import { WORD_SCORE_MULTIPLIERS, MINIMUM_LETTERS_FOR_BINGO } from "../settings";
import { getTilesInWord } from "../index";

export const getWordMultiplier = (
  wordBonuses = [],
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) => {
  return wordBonuses.reduce((totalMultiplier, bonus) => {
    checkIsBonusDefined({
      wordScoreMultipliers,
      bonusType: bonus.type
    });
    const bonusMultiplier = wordScoreMultipliers[bonus.type];
    return totalMultiplier * bonusMultiplier * bonus.times;
  }, 1);
};

export function getWordBonusTypes(
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) {
  return Array.from(Object.keys(wordScoreMultipliers));
}

export function checkIsBonusDefined({
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS,
  bonusType
}) {
  if (!isBonusDefined({ wordScoreMultipliers, bonusType })) {
    throw new RangeError(`No '${bonusType}' bonus type in the score table`);
  }
}

export function isBonusDefined({
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS,
  bonusType
}) {
  return wordScoreMultipliers.hasOwnProperty(bonusType);
}

export const isNextBonusAllowed = (
  input,
  { languageCode, wordBonuses = [], tileBonuses = [] }
) => {
  const totalTimesWordBonusesUsed = wordBonuses.reduce((total, bonus) => {
    return (total += timesBonusTypeUsed(bonus.type, wordBonuses));
  }, 0);
  const totalTilesMultiplied = tileBonuses.length;
  const totalTimesAnyBonusTypeUsed =
    totalTimesWordBonusesUsed + totalTilesMultiplied;
  const tiles = getTilesInWord(input, {
    languageCode
  });
  return tiles.length > totalTimesAnyBonusTypeUsed;
};

export const timesBonusTypeUsed = (bonusType, wordBonuses) => {
  return wordBonuses.find(bonus => bonus.type === bonusType)?.times ?? 0;
};

export const isBingoAllowed = (
  input,
  { languageCode, minTilesForBingo = MINIMUM_LETTERS_FOR_BINGO }
) => {
  return getTilesInWord(input, { languageCode }).length >= minTilesForBingo;
};
