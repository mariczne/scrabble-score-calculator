import { WORD_SCORE_MULTIPLIERS, MIN_TILES_FOR_BINGO } from "../settings";
import { getTilesInWord } from "../index";
import { checkIsBonusDefined } from "./error";
import { Bonus, WordBonus, TileBonus } from "../interfaces";

export function getTileBonuses(bonuses: Bonus[]): TileBonus[] {
  return bonuses.filter((bonus) => bonus.type === "tile") as TileBonus[];
}

export function getWordBonuses(bonuses: Bonus[]): WordBonus[] {
  return bonuses.filter((bonus) => bonus.type === "word") as WordBonus[];
}

export function getWordMultiplier(wordBonuses: WordBonus[] = []): number {
  return wordBonuses.reduce((totalMultiplier, bonus) => {
    checkIsBonusDefined(bonus.multiplier);
    return totalMultiplier * bonus.multiplier;
  }, 1);
}

export function getWordBonusTypes(
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) {
  return wordScoreMultipliers.map((bonus) => bonus.name);
}

export const isBonusDefined = (
  multiplier: number,
  wordScoreMultipliers = WORD_SCORE_MULTIPLIERS
) => {
  return wordScoreMultipliers.some((bonus) => bonus.multiplier === multiplier);
};

export const isNextBonusAllowed = (tiles: string[], bonuses: Bonus[]) => {
  return tiles.length > bonuses.length;
};

export const isBingoAllowed = (
  input: string,
  languageCode: string,
  minTilesForBingo = MIN_TILES_FOR_BINGO
) => {
  return getTilesInWord(input, { languageCode }).length >= minTilesForBingo;
};
