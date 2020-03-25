import { SETTINGS, checkIsBingoAllowed } from "../modules/calculator";
const { MAX_LETTER_SCORE_MULTIPLIER, MAX_WORD_SCORE_MULTIPLIER } = SETTINGS;

export function setInput(input) {
  return { type: "SET_INPUT", payload: { input } };
}

export function changeLanguage(language) {
  return { type: "CHANGE_LANGUAGE", payload: { language } };
}

export function cycleTileBonus(state, tileIndex) {
  const tileBonus = state.bonuses.find(tile => tile.index === tileIndex);
  if (tileBonus) {
    if (tileBonus.type === "tile") {
      if (tileBonus.multiplier === MAX_LETTER_SCORE_MULTIPLIER) {
        return { type: "ADD_WORD_MULTIPLIER", payload: { tileIndex } };
      }
      return { type: "INCREMENT_TILE_MULTIPLIER", payload: { tileIndex } };
    } else if (tileBonus.type === "word") {
      if (tileBonus.multiplier === MAX_WORD_SCORE_MULTIPLIER) {
        return { type: "REMOVE_WORD_MULTIPLIER", payload: { tileIndex } };
      }
      return { type: "INCREMENT_WORD_MULTIPLIER", payload: { tileIndex } };
    }
    return { type: "ACTION_CANCELLED" };
  }
  return { type: "ADD_TILE_BONUS", payload: { tileIndex } };
}

export function toggleBingo(state) {
  try {
    checkIsBingoAllowed(state.input, { languageCode: state.language });
    return { type: "TOGGLE_BINGO" };
  } catch {
    return { type: "ACTION_CANCELLED" };
  }
}
