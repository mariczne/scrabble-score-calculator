import { WORD_SCORE_MULTIPLIERS } from "../settings";
import { Bonus, WordBonus, TileBonus, Multiplier } from "../types";

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
  wordScoreMultipliers: Multiplier[] = WORD_SCORE_MULTIPLIERS
): string[] {
  return wordScoreMultipliers.map((bonus) => bonus.name);
}

export const isBonusDefined = (
  multiplier: number,
  wordScoreMultipliers: Multiplier[] = WORD_SCORE_MULTIPLIERS
): boolean => {
  return wordScoreMultipliers.some((bonus) => bonus.multiplier === multiplier);
};

export const isNextBonusAllowed = (
  tiles: string[],
  bonuses: Bonus[]
): boolean => {
  return tiles.length > bonuses.length;
};

export function checkIsBonusDefined(multiplier: number): void {
  if (!isBonusDefined(multiplier)) {
    throw new RangeError(`No ${multiplier}x word bonus in the settings`);
  }
}

export function checkIsNextBonusAllowed(
  tilesInWord: string[],
  bonuses: Bonus[]
): void {
  if (!isNextBonusAllowed(tilesInWord, bonuses)) {
    throw new Error();
  }
}
