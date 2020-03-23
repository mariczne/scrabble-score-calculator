import { WORD_SCORE_MULTIPLIERS, MINIMUM_LETTERS_FOR_BINGO } from "../settings";
import { getTilesInWord } from "../index";
import { checkIsBonusDefined } from "./error";

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
  const tiles = getTilesInWord(input, {
    languageCode
  });
  return (
    tiles.length > totalTimesAnyBonusTypeUsed({ wordBonuses, tileBonuses })
  );
};

export const timesBonusTypeUsed = (bonusType, wordBonuses) => {
  return wordBonuses.find(bonus => bonus.type === bonusType)?.times ?? 0;
};

export const totalTimesWordBonusesUsed = ({ wordBonuses }) => {
  return wordBonuses.reduce((total, bonus) => {
    return (total += timesBonusTypeUsed(bonus.type, wordBonuses));
  }, 0);
};

export const totalTimesAnyBonusTypeUsed = ({
  wordBonuses = [],
  tileBonuses = []
}) => {
  return totalTimesWordBonusesUsed({ wordBonuses }) + tileBonuses.length;
};

export const isBingoAllowed = (
  input,
  { languageCode, minTilesForBingo = MINIMUM_LETTERS_FOR_BINGO }
) => {
  return getTilesInWord(input, { languageCode }).length >= minTilesForBingo;
};
