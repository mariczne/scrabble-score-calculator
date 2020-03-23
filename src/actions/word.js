import {
  SETTINGS,
  checkIsNextBonusAllowed,
  checkIsBingoAllowed
} from "../modules/calculator";
const { MAX_LETTER_SCORE_MULTIPLIER } = SETTINGS;

export function setInput(inputValue) {
  return { type: "SET_INPUT", payload: { inputValue } };
}

export function changeLanguage(language) {
  return { type: "CHANGE_LANGUAGE", payload: { language } };
}

export function cycleTileBonus(state, tileIndex) {
  const tileBonus = state.tileBonuses.find(tile => tile.index === tileIndex);
  if (tileBonus) {
    if (tileBonus.multiplier === MAX_LETTER_SCORE_MULTIPLIER) {
      return { type: "REMOVE_TILE_BONUS", payload: { tileIndex } };
    } else {
      return { type: "INCREMENT_TILE_BONUS", payload: { tileIndex } };
    }
  } else {
    try {
      checkIsNextBonusAllowed(state.input, {
        languageCode: state.language,
        wordBonuses: state.wordBonuses,
        tileBonuses: state.tileBonuses
      });
      return { type: "ADD_TILE_BONUS", payload: { tileIndex } };
    } catch {
      return { type: undefined };
    }
  }
}

export function addWordBonus(state, bonusType) {
  try {
    checkIsNextBonusAllowed(state.input, {
      languageCode: state.language,
      wordBonuses: state.wordBonuses,
      tileBonuses: state.tileBonuses
    });
    const bonus = state.wordBonuses.find(bonus => bonus.type === bonusType);
    if (bonus) {
      return { type: "INCREMENT_WORD_BONUS_COUNT", payload: { bonusType } };
    } else {
      return { type: "ADD_WORD_BONUS", payload: { bonusType } };
    }
  } catch {
    return { type: undefined };
  }
}

export function removeWordBonus(state, bonusType) {
  const bonus = state.wordBonuses.find(bonus => bonus.type === bonusType);
  if (bonus) {
    if (bonus.times > 1) {
      return { type: "DECREMENT_WORD_BONUS_COUNT", payload: { bonusType } };
    } else {
      return { type: "REMOVE_WORD_BONUS", payload: { bonusType } };
    }
  }
}

export function toggleBingo(state) {
  try {
    checkIsBingoAllowed(state.input, { languageCode: state.language });
    return { type: "TOGGLE_BINGO" };
  } catch {
    return { type: undefined };
  }
}
