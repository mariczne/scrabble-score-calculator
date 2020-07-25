import { Action, State } from "../reducers/wordReducer";
import { SETTINGS, checkIsBingoAllowed } from "../modules/calculator";
import { BonusType } from "../modules/calculator/interfaces";

const {
  MAX_TILE_SCORE_MULTIPLIER,
  MAX_WORD_SCORE_MULTIPLIER,
  MIN_TILES_FOR_BINGO,
} = SETTINGS;

export interface SetInputAction extends Action {
  type: "INPUT_CHANGED";
  payload: { input: string; minTilesForBingo: number };
}

export function setInput(input: string): SetInputAction {
  return {
    type: "INPUT_CHANGED",
    payload: { input, minTilesForBingo: MIN_TILES_FOR_BINGO },
  };
}

export interface ChangeLanguageAction extends Action {
  type: "LANGUAGE_CHANGED";
  payload: { language: string };
}

export function changeLanguage(languageCode: string): ChangeLanguageAction {
  return { type: "LANGUAGE_CHANGED", payload: { language: languageCode } };
}

export type MultiplierActionType =
  | "WORD_MULTIPLIER_ADDED"
  | "WORD_MULTIPLIER_INCREMENTED"
  | "WORD_MULTIPLIER_REMOVED"
  | "TILE_MULTIPLIER_ADDED"
  | "TILE_MULTIPLIER_INCREMENTED";

export interface CycleTileBonusAction extends Action {
  type: MultiplierActionType;
  payload: { tileIndex: number };
}

export interface CancelAction extends Action {
  type: "ACTION_CANCELLED";
}

export function cycleTileBonus(
  state: State,
  tileIndex: number
): CycleTileBonusAction | CancelAction {
  const tileBonus = state.bonuses.find((tile) => tile.index === tileIndex);
  if (tileBonus) {
    if (tileBonus.type === BonusType.Tile) {
      if (tileBonus.multiplier === MAX_TILE_SCORE_MULTIPLIER) {
        return { type: "WORD_MULTIPLIER_ADDED", payload: { tileIndex } };
      }
      return { type: "TILE_MULTIPLIER_INCREMENTED", payload: { tileIndex } };
    } else if (tileBonus.type === BonusType.Word) {
      if (tileBonus.multiplier === MAX_WORD_SCORE_MULTIPLIER) {
        return { type: "WORD_MULTIPLIER_REMOVED", payload: { tileIndex } };
      }
      return { type: "WORD_MULTIPLIER_INCREMENTED", payload: { tileIndex } };
    }
    return { type: "ACTION_CANCELLED" };
  }
  return { type: "TILE_MULTIPLIER_ADDED", payload: { tileIndex } };
}

export function toggleBingo(state: State): Action {
  try {
    checkIsBingoAllowed(state.input, state.language);
    return { type: "BINGO_TOGGLED" };
  } catch {
    return { type: "ACTION_CANCELLED" };
  }
}
