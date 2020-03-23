import { POINTS_FOR_BINGO, WORD_SCORE_MULTIPLIERS } from "./constants/settings";
import SCORE_TABLE from "./constants/scoreTable";
import {
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage,
  processMultigraphs
} from "./util/multigraph";
import { checkIsLanguageDefinedInScoretable } from "./util/language";
import {
  checkIsBonusDefinedInScoretable,
  timesBonusTypeUsed
} from "./util/bonus";

export const getWordScore = (
  input,
  {
    languageCode = "eng",
    scoreTable = SCORE_TABLE,
    wordBonuses = {},
    tileBonuses = {},
    isBingoUsed = false
  }
) => {
  if (!input) {
    return 0;
  }
  checkIsLanguageDefinedInScoretable({ scoreTable, languageCode });
  const tiles = getTilesInWord(input, { scoreTable, languageCode });
  return (
    tiles
      .map((tile, index) =>
        getTileScore(tile, {
          languageCode,
          scoreMultiplier: tileBonuses[index]
        })
      )
      .reduce((acc, curr) => (acc += curr)) *
      getWordMultiplier(wordBonuses) +
    (isBingoUsed ? POINTS_FOR_BINGO : 0)
  );
};

export const getTileScore = (
  input,
  { languageCode = "eng", scoreTable = SCORE_TABLE, scoreMultiplier = 1 }
) => {
  checkIsLanguageDefinedInScoretable({ scoreTable, languageCode });
  const score = Number(
    Object.keys(scoreTable[languageCode]).find(key =>
      scoreTable[languageCode][key].includes(input.toUpperCase())
    )
  );
  return score * scoreMultiplier;
};

export const getTilesInWord = (
  input,
  { languageCode = "eng", scoreTable = SCORE_TABLE }
) => {
  const language = { scoreTable, languageCode };
  checkIsLanguageDefinedInScoretable(language);
  let tiles = Array.from(input.toUpperCase());
  if (isLanguageWithMultigraphs(language)) {
    const multigraphs = getMultigraphsInLanguage(language);
    tiles = processMultigraphs(tiles, multigraphs);
  }
  return tiles;
};

export const getWordMultiplier = (
  wordBonuses = [],
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) => {
  let multiplierTotal = 1;
  for (const bonusType in wordBonuses) {
    checkIsBonusDefinedInScoretable({
      wordScoreMultipliers,
      bonusType
    });
    const bonusMultiplier = wordScoreMultipliers[bonusType];
    for (let i = 0; i < timesBonusTypeUsed(bonusType, wordBonuses); i++) {
      multiplierTotal *= bonusMultiplier;
    }
  }
  return multiplierTotal;
};

export { getSupportedLanguages } from "./util/language";

export default {
  getWordScore,
  getTileScore,
  getTilesInWord,
  getWordMultiplier
};
