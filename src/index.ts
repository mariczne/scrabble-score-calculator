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
import { POINTS_FOR_BINGO } from "./settings";
import SCORE_TABLE from "./scoreTable";
import {
  WordScoreOptions,
  TileScoreOptions,
  TilesInWordOptions,
  WordBonus,
  TileBonus,
  Language,
  ScoreTable,
} from "./types";

export class Calculator {
  languageCode: Language["languageCode"];
  scoreTable: ScoreTable;

  constructor(languageCode: Language["languageCode"], scoreTable?: ScoreTable) {
    this.languageCode = languageCode;
    this.scoreTable = scoreTable || SCORE_TABLE;
  }

  getWordScore(
    input: string,
    options?: Omit<WordScoreOptions, "languageCode" | "scoreTable">
  ) {
    return getWordScore(input, {
      languageCode: this.languageCode,
      scoreTable: this.scoreTable,
      ...options,
    });
  }

  getTileScore(
    input: string,
    options?: Omit<TileScoreOptions, "languageCode" | "scoreTable">
  ) {
    return getTileScore(input, {
      languageCode: this.languageCode,
      scoreTable: this.scoreTable,
      ...options,
    });
  }

  getTilesInWord(input: string) {
    return getTilesInWord(input, {
      languageCode: this.languageCode,
      scoreTable: this.scoreTable,
    });
  }
}

export function getWordScore(
  input: string,
  {
    languageCode,
    scoreTable = SCORE_TABLE,
    bonuses = [],
    isBingoUsed = false,
  }: WordScoreOptions
): number {
  if (isBingoUsed) checkIsBingoAllowed(getTilesInWord(input, { languageCode }));
  checkIsLanguageDefined(scoreTable, languageCode);
  checkAreAllBonusesAllowed(getTilesInWord(input, { languageCode }), bonuses);

  const tileBonuses: TileBonus[] = getTileBonuses(bonuses);
  const wordBonuses: WordBonus[] = getWordBonuses(bonuses);
  const pointsForBingo = isBingoUsed ? POINTS_FOR_BINGO : 0;

  function getTileMultiplier(index: number): number {
    return tileBonuses.find((tile) => tile.index === index)?.multiplier || 1;
  }

  // Prettier can't handle it
  // prettier-ignore
  return (
    getTilesInWord(input, { scoreTable, languageCode })
      .map((tile, index) => getTileScore(tile, { languageCode, multiplier: getTileMultiplier(index) }))
      .reduce((acc, curr) => acc + curr, 0) * getWordMultiplier(wordBonuses) + pointsForBingo
  );
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
export * from "./utilities/error";
export { getSupportedLanguages } from "./utilities/language";
export { getWordBonusTypes, isNextBonusAllowed } from "./utilities/bonus";
