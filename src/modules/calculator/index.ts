import {
  WordScoreOptions,
  TileScoreOptions,
  TilesInWordOptions,
  WordBonus,
  TileBonus,
} from "./interfaces";
import { POINTS_FOR_BINGO } from "./settings";
import SCORE_TABLE from "./scoreTable";
import {
  getTileBonuses,
  getWordBonuses,
  getWordMultiplier,
} from "./utilities/bonus";
import {
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage,
  processMultigraphs,
} from "./utilities/multigraph";
import {
  checkIsLanguageDefined,
  checkAreAllBonusesAllowed,
  checkIsBingoAllowed,
} from "./utilities/error";

export function getWordScore(
  input: string,
  {
    languageCode,
    scoreTable = SCORE_TABLE,
    bonuses = [],
    isBingoUsed = false,
  }: WordScoreOptions
): number {
  if (!input) {
    return 0;
  }
  if (isBingoUsed) {
    checkIsBingoAllowed(input, languageCode);
  }
  checkIsLanguageDefined(scoreTable, languageCode);
  checkAreAllBonusesAllowed(input, languageCode, bonuses);

  const tileBonuses: TileBonus[] = getTileBonuses(bonuses);
  const wordBonuses: WordBonus[] = getWordBonuses(bonuses);

  return (
    getTilesInWord(input, { scoreTable, languageCode })
      .map((tile, index) =>
        getTileScore(tile, {
          languageCode,
          multiplier:
            tileBonuses.find((tile) => tile.index === index)?.multiplier ?? 1,
        })
      )
      .reduce((acc, curr) => (acc += curr)) *
      getWordMultiplier(wordBonuses) +
    (isBingoUsed ? POINTS_FOR_BINGO : 0)
  );
}

export function getTileScore(
  input: string,
  { languageCode, scoreTable = SCORE_TABLE, multiplier = 1 }: TileScoreOptions
): number {
  checkIsLanguageDefined(scoreTable, languageCode);

  const score = Number(
    Object.keys(scoreTable[languageCode]).find((key) => {
      return scoreTable[languageCode][(key as unknown) as number].includes(
        input.toUpperCase()
      );
    })
  );
  return score * multiplier;
}

export const getTilesInWord = (
  input: string,
  { languageCode, scoreTable = SCORE_TABLE }: TilesInWordOptions
): string[] => {
  checkIsLanguageDefined(scoreTable, languageCode);

  const tiles = Array.from(input.toUpperCase());
  if (isLanguageWithMultigraphs(scoreTable, languageCode)) {
    return processMultigraphs(
      tiles,
      getMultigraphsInLanguage(scoreTable, languageCode)
    );
  }
  return tiles;
};

export { default as SETTINGS } from "./settings";
export { default as SCORE_TABLE } from "./scoreTable";
export { getSupportedLanguages } from "./utilities/language";
export * from "./utilities/error";
export {
  getWordBonusTypes,
  isNextBonusAllowed,
  isBingoAllowed,
} from "./utilities/bonus";

export default {
  getWordScore,
  getTileScore,
  getTilesInWord,
};
