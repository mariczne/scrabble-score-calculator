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
  joinMultigraphsInTiles,
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
  if (isBingoUsed) checkIsBingoAllowed(input, languageCode);
  checkIsLanguageDefined(scoreTable, languageCode);
  checkAreAllBonusesAllowed(input, languageCode, bonuses);

  const tileBonuses: TileBonus[] = getTileBonuses(bonuses);
  const wordBonuses: WordBonus[] = getWordBonuses(bonuses);
  const pointsForBingo = isBingoUsed ? POINTS_FOR_BINGO : 0;

  function getTileMultiplier(index: number): number {
    return tileBonuses.find((tile) => tile.index === index)?.multiplier || 1;
  }

  // Prettier can't handle it
  // prettier-ignore
  return getTilesInWord(input, { scoreTable, languageCode })
      .map((tile, index) => 
        getTileScore(tile, { languageCode, multiplier: getTileMultiplier(index)})
      )
      .reduce((acc, curr) => acc + curr, 0) * getWordMultiplier(wordBonuses) + pointsForBingo;
}

export function getTileScore(
  input: string,
  { languageCode, scoreTable = SCORE_TABLE, multiplier = 1 }: TileScoreOptions
): number {
  checkIsLanguageDefined(scoreTable, languageCode);

  const score = Number(
    Object.keys(scoreTable[languageCode].scores).find((key) =>
      scoreTable[languageCode].scores[key].includes(input.toUpperCase())
    )
  );

  return score * multiplier;
}

export function getTilesInWord(
  input: string,
  { languageCode, scoreTable = SCORE_TABLE }: TilesInWordOptions
): string[] {
  checkIsLanguageDefined(scoreTable, languageCode);

  const letters = Array.from(input.toUpperCase());

  if (isLanguageWithMultigraphs(scoreTable, languageCode)) {
    return joinMultigraphsInTiles(
      letters,
      getMultigraphsInLanguage(scoreTable, languageCode)
    );
  }

  return letters;
}

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
