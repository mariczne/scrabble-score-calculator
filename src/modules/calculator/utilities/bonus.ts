import { WORD_SCORE_MULTIPLIERS, MIN_TILES_FOR_BINGO } from "../settings";
import { getTilesInWord } from "../index";
import { checkIsBonusDefined } from "./error";
import {
  Bonus,
  BonusType,
  WordBonus,
  TileBonus,
  Multiplier,
} from "../interfaces";

export function getTileBonuses(bonuses: Bonus[]): TileBonus[] {
  return bonuses.filter(
    (bonus) => bonus.type === BonusType.Tile
  ) as TileBonus[];
}

export function getWordBonuses(bonuses: Bonus[]): WordBonus[] {
  return bonuses.filter(
    (bonus) => bonus.type === BonusType.Word
  ) as WordBonus[];
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

export const isBingoAllowed = (
  input: string,
  languageCode: string,
  minTilesForBingo: number = MIN_TILES_FOR_BINGO
): boolean => {
  return getTilesInWord(input, { languageCode }).length >= minTilesForBingo;
};
