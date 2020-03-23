import {
  WORD_SCORE_MULTIPLIERS,
  MINIMUM_LETTERS_FOR_BINGO
} from "../constants/settings";
import { getTilesInWord } from "../index";

export function getWordBonusTypes(
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) {
  return Array.from(Object.keys(wordScoreMultipliers));
}

export function checkIsBonusDefinedInScoretable({
  wordScoreMultipliers,
  bonusType
}) {
  if (!isBonusDefinedInScoretable({ wordScoreMultipliers, bonusType })) {
    throw new RangeError(`No '${bonusType}' bonus type in the score table`);
  }
}

export function isBonusDefinedInScoretable({
  wordScoreMultipliers,
  bonusType
}) {
  return wordScoreMultipliers.hasOwnProperty(bonusType);
}

export const isNextBonusAllowed = (
  input,
  { languageCode, wordBonuses, tileBonuses }
) => {
  let totalTimesAnyBonusTypeUsed = 0;
  for (const bonusType in wordBonuses) {
    totalTimesAnyBonusTypeUsed += timesBonusTypeUsed(bonusType, wordBonuses);
  }
  for (const key in tileBonuses) {
    if (tileBonuses[key] !== 1) {
      totalTimesAnyBonusTypeUsed++;
    }
  }
  const tiles = getTilesInWord(input, {
    languageCode: languageCode
  });
  return tiles.length > totalTimesAnyBonusTypeUsed;
};

export const timesBonusTypeUsed = (bonusType, wordBonuses) => {
  return wordBonuses[bonusType];
};

export const isBingoAllowed = (
  input,
  { languageCode, minTilesForBingo = MINIMUM_LETTERS_FOR_BINGO }
) => {
  return getTilesInWord(input, { languageCode }).length >= minTilesForBingo;
};
