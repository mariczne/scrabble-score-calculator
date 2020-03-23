import { POINTS_FOR_BINGO } from "./settings";
import SCORE_TABLE from "./scoreTable";
import {
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage,
  processMultigraphs
} from "./util/multigraph";
import { checkIsLanguageDefined } from "./util/language";
import { getWordMultiplier } from "./util/bonus";

export const getWordScore = (
  input,
  {
    languageCode,
    scoreTable = SCORE_TABLE,
    wordBonuses = [],
    tileBonuses = [],
    isBingoUsed = false
  }
) => {
  if (!input) {
    return 0;
  }
  checkIsLanguageDefined({ scoreTable, languageCode });

  return (
    getTilesInWord(input, { scoreTable, languageCode })
      .map((tile, index) =>
        getTileScore(tile, {
          languageCode,
          multiplier:
            tileBonuses.find(tile => tile.index === index)?.multiplier ?? 1
        })
      )
      .reduce((acc, curr) => (acc += curr))
      * getWordMultiplier(wordBonuses)
      + (isBingoUsed ? POINTS_FOR_BINGO : 0)
  );
};

export const getTileScore = (
  input,
  { languageCode, scoreTable = SCORE_TABLE, multiplier = 1 }
) => {
  checkIsLanguageDefined({ scoreTable, languageCode });

  const score = Number(
    Object.keys(scoreTable[languageCode]).find(key =>
      scoreTable[languageCode][key].includes(input.toUpperCase())
    )
  );
  return score * multiplier;
};

export const getTilesInWord = (
  input,
  { languageCode, scoreTable = SCORE_TABLE }
) => {
  const language = { scoreTable, languageCode };
  checkIsLanguageDefined(language);

  const tiles = Array.from(input.toUpperCase());
  if (isLanguageWithMultigraphs(language)) {
    return processMultigraphs(tiles, getMultigraphsInLanguage(language));
  }
  return tiles;
};

export { default as SETTINGS } from "./settings";
export { default as SCORE_TABLE } from "./scoreTable";
export { getSupportedLanguages } from "./util/language";
export {
  getWordMultiplier,
  getWordBonusTypes,
  isNextBonusAllowed,
  isBingoAllowed
} from "./util/bonus";

export default {
  getWordScore,
  getTileScore,
  getTilesInWord
};
