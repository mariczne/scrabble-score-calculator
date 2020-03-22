import { MAX_LETTER_SCORE_MULTIPLIER } from "../constants/scoretable";
import {
  isNextBonusAllowed,
  isBingoAllowed,
  getTilesInWord
} from "../modules/calculator";

export default function wordReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return changeInput(state, action.payload.input);
    }
    case "CHANGE_LANGUAGE": {
      return { ...state, language: action.payload.language };
    }
    case "CYCLE_TILE_BONUS": {
      return cycleTileBonus(state, action.payload.tileId);
    }
    case "ADD_WORD_BONUS": {
      return addWordBonus(state, action.payload.bonusType);
    }
    case "REMOVE_WORD_BONUS": {
      return removeWordBonus(state, action.payload.bonusType);
    }
    case "TOGGLE_BINGO": {
      return toggleBingo(state);
    }
    case "RESET": {
      return {
        ...state,
        input: "",
        wordBonuses: {},
        tileBonuses: {},
        isBingoUsed: false
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function changeInput(state, input) {
  // remove surplus tile bonuses
  const tileBonuses = { ...state.tileBonuses };
  const tilesInWordCount = getTilesInWord(input, { language: state.language })
    .length;
  for (const key in state.tileBonuses) {
    if (key >= tilesInWordCount) {
      delete tileBonuses[key];
    }
  }
  return {
    ...state,
    tileBonuses,
    input
  };
}

function cycleTileBonus(state, tileId) {
  if (state.tileBonuses[tileId]) {
    if (state.tileBonuses[tileId] === 1) {
      if (isNextBonusAllowed(state)) {
        return { ...state, tileBonuses: { ...state.tileBonuses, [tileId]: 2 } };
      } else {
        return state;
      }
    } else if (state.tileBonuses[tileId] === MAX_LETTER_SCORE_MULTIPLIER) {
      return { ...state, tileBonuses: { ...state.tileBonuses, [tileId]: 1 } };
    } else {
      return {
        ...state,
        tileBonuses: {
          ...state.tileBonuses,
          [tileId]: state.tileBonuses[tileId] + 1
        }
      };
    }
  } else if (isNextBonusAllowed(state)) {
    return {
      ...state,
      tileBonuses: {
        ...state.tileBonuses,
        [tileId]: 2
      }
    };
  }
}

function addWordBonus(state, bonusType) {
  if (isNextBonusAllowed(state)) {
    if (!state.wordBonuses[bonusType]) {
      return {
        ...state,
        wordBonuses: { ...state.wordBonuses, [bonusType]: 1 }
      };
    } else {
      return {
        ...state,
        wordBonuses: {
          ...state.wordBonuses,
          [bonusType]: state.wordBonuses[bonusType] + 1
        }
      };
    }
  }
  return state;
}

function removeWordBonus(state, bonusType) {
  if (state.wordBonuses[bonusType] > 1) {
    return {
      ...state,
      wordBonuses: {
        ...state.wordBonuses,
        [bonusType]: state.wordBonuses[bonusType] - 1
      }
    };
  }
  return {
    ...state,
    wordBonuses: {
      ...state.wordBonuses,
      [bonusType]: null
    }
  };
}

function toggleBingo(state) {
  if (isBingoAllowed(state)) {
    return { ...state, isBingoUsed: !state.isBingoUsed };
  }
  return state;
}
