import { Multiplier } from "./types";

interface Settings {
  MAX_TILE_SCORE_MULTIPLIER: number;
  POINTS_FOR_BINGO: number;
  MIN_TILES_FOR_BINGO: number;
  WORD_SCORE_MULTIPLIERS: Multiplier[];
  MAX_WORD_SCORE_MULTIPLIER: number;
}

export const MAX_TILE_SCORE_MULTIPLIER = 3;
export const POINTS_FOR_BINGO = 50; // 0 disables bingo completely
export const MIN_TILES_FOR_BINGO = 7;
export const WORD_SCORE_MULTIPLIERS = [
  { name: "double", multiplier: 2 },
  { name: "triple", multiplier: 3 },
];

export const MAX_WORD_SCORE_MULTIPLIER = WORD_SCORE_MULTIPLIERS.reduce(
  (max, current) => {
    if (current.multiplier > max) {
      return current.multiplier;
    }
    return max;
  },
  1
);

const SETTINGS: Settings = {
  MAX_TILE_SCORE_MULTIPLIER,
  POINTS_FOR_BINGO,
  MIN_TILES_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS,
  MAX_WORD_SCORE_MULTIPLIER,
};

export default SETTINGS;
