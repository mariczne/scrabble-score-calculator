import { Bonus } from "../modules/calculator/interfaces";
import {
  SetInputAction,
  ChangeLanguageAction,
  CycleTileBonusAction,
} from "../actions/wordActions";

export interface Action {
  type: string;
  payload?: any;
}

export interface State {
  input: string;
  language: string;
  bonuses: Bonus[];
  isBingoUsed: boolean;
}

export default function wordReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INPUT_CHANGED": {
      const {
        payload: { input, minTilesForBingo },
      } = action as SetInputAction;

      const { bonuses, isBingoUsed } = state;

      return {
        ...state,
        input,
        bonuses: bonuses.filter((bonus) => bonus.index < input.length),
        isBingoUsed: input.length >= minTilesForBingo ? isBingoUsed : false,
      };
    }
    case "LANGUAGE_CHANGED": {
      const {
        payload: { language },
      } = action as ChangeLanguageAction;

      return { ...state, language };
    }
    case "TILE_MULTIPLIER_ADDED": {
      const {
        payload: { tileIndex },
      } = action as CycleTileBonusAction;

      return {
        ...state,
        bonuses: [
          ...state.bonuses,
          { type: "tile", index: tileIndex, multiplier: 2 },
        ],
      };
    }
    case "TILE_MULTIPLIER_INCREMENTED": {
      const {
        payload: { tileIndex },
      } = action as CycleTileBonusAction;

      return {
        ...state,
        bonuses: state.bonuses.map((tile) => {
          if (tile.index === tileIndex) {
            return { ...tile, multiplier: tile.multiplier + 1 };
          }
          return tile;
        }),
      };
    }
    case "WORD_MULTIPLIER_ADDED": {
      const {
        payload: { tileIndex },
      } = action as CycleTileBonusAction;

      return {
        ...state,
        bonuses: state.bonuses.map((tile) => {
          if (tile.index === tileIndex) {
            return { ...tile, type: "word", multiplier: 2 };
          }
          return tile;
        }),
      };
    }
    case "WORD_MULTIPLIER_INCREMENTED": {
      const {
        payload: { tileIndex },
      } = action as CycleTileBonusAction;

      return {
        ...state,
        bonuses: state.bonuses.map((tile) => {
          if (tile.index === tileIndex) {
            return { ...tile, multiplier: tile.multiplier + 1 };
          }
          return tile;
        }),
      };
    }
    case "WORD_MULTIPLIER_REMOVED": {
      const {
        payload: { tileIndex },
      } = action as CycleTileBonusAction;

      return {
        ...state,
        bonuses: state.bonuses.filter((tile) => tile.index !== tileIndex),
      };
    }
    case "BINGO_TOGGLED": {
      return { ...state, isBingoUsed: !state.isBingoUsed };
    }
    case "WORD_RESET": {
      return {
        ...state,
        input: "",
        bonuses: [],
        isBingoUsed: false,
      };
    }
    default: {
      return state;
    }
  }
}
