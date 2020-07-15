import { SETTINGS, checkIsBingoAllowed } from "../modules/calculator";
const {
  MAX_TILE_SCORE_MULTIPLIER,
  MAX_WORD_SCORE_MULTIPLIER,
  MIN_TILES_FOR_BINGO,
} = SETTINGS;

export function setInput(input) {
  return {
    type: "INPUT_CHANGED",
    payload: { input, minTilesForBingo: MIN_TILES_FOR_BINGO },
  };
}

export function changeLanguage(language) {
  return { type: "LANGUAGE_CHANGED", payload: { language } };
}

export function cycleTileBonus(state, tileIndex) {
  const tileBonus = state.bonuses.find((tile) => tile.index === tileIndex);
  if (tileBonus) {
    if (tileBonus.type === "tile") {
      if (tileBonus.multiplier === MAX_TILE_SCORE_MULTIPLIER) {
        return { type: "WORD_MULTIPLIER_ADDED", payload: { tileIndex } };
      }
      return { type: "TILE_MULTIPLIER_INCREMENTED", payload: { tileIndex } };
    } else if (tileBonus.type === "word") {
      if (tileBonus.multiplier === MAX_WORD_SCORE_MULTIPLIER) {
        return { type: "WORD_MULTIPLIER_REMOVED", payload: { tileIndex } };
      }
      return { type: "WORD_MULTIPLIER_INCREMENTED", payload: { tileIndex } };
    }
    return { type: "ACTION_CANCELLED" };
  }
  return { type: "TILE_MULTIPLIER_ADDED", payload: { tileIndex } };
}

export function toggleBingo(state) {
  try {
    checkIsBingoAllowed(state.input, state.language);
    return { type: "BINGO_TOGGLED" };
  } catch {
    return { type: "ACTION_CANCELLED" };
  }
}
