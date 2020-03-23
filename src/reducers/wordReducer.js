import {
  SETTINGS,
  getTilesInWord,
  isNextBonusAllowed,
  isBingoAllowed
} from "../modules/calculator";

const { MAX_LETTER_SCORE_MULTIPLIER } = SETTINGS;

export default function wordReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return changeInput(state, action.payload.input);
    }
    case "CHANGE_LANGUAGE": {
      return { ...state, language: action.payload.language };
    }
    case "CYCLE_TILE_BONUS": {
      return cycleTileBonus(state, action.payload.tileIndex);
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
    case "RESET_WORD": {
      return {
        ...state,
        input: "",
        wordBonuses: {},
        tileBonuses: [],
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
  const tilesInWordCount = getTilesInWord(input, { languageCode: state.language })
    .length;
  const tileBonuses = state.tileBonuses.filter(
    bonus => bonus.tileIndex < tilesInWordCount
  );

  return {
    ...state,
    tileBonuses,
    input
  };
}

function cycleTileBonus(state, tileIndex) {
  const tileBonus = state.tileBonuses.find(tile => tile.index === tileIndex);
  if (tileBonus) {
    if (tileBonus.multiplier === MAX_LETTER_SCORE_MULTIPLIER) {
      return {
        ...state,
        tileBonuses: state.tileBonuses.filter(tile => tile.index !== tileIndex)
      };
    } else {
      return {
        ...state,
        tileBonuses: state.tileBonuses.map(tile => {
          if (tile.index === tileIndex) {
            return { index: tileIndex, multiplier: tile.multiplier + 1 };
          }
          return tile;
        })
      };
    }
  } else {
    if (
      isNextBonusAllowed(state.input, {
        languageCode: state.language,
        wordBonuses: state.wordBonuses,
        tileBonuses: state.tileBonuses
      })
    ) {
      return {
        ...state,
        tileBonuses: [...state.tileBonuses, { index: tileIndex, multiplier: 2 }]
      };
    } else {
      return state;
    }
  }
}

function addWordBonus(state, bonusType) {
  if (
    isNextBonusAllowed(state.input, {
      languageCode: state.language,
      wordBonuses: state.wordBonuses,
      tileBonuses: state.tileBonuses
    })
  ) {
    const bonus = state.wordBonuses.find(bonus => bonus.type === bonusType);
    if (bonus) {
      return {
        ...state,
        wordBonuses: state.wordBonuses.map(bonus => {
          if (bonus.type === bonusType) {
            return { ...bonus, times: bonus.times + 1 };
          }
          return bonus;
        })
      };
    } else {
      return {
        ...state,
        wordBonuses: [...state.wordBonuses, { type: bonusType, times: 1 }]
      };
    }
  } else {
    return state;
  }
}

function removeWordBonus(state, bonusType) {
  const bonus = state.wordBonuses.find(bonus => bonus.type === bonusType);
  if (bonus) {
    if (bonus.times > 1) {
      return {
        ...state,
        wordBonuses: state.wordBonuses.map(bonus => {
          if (bonus.type === bonusType) {
            return { ...bonus, times: bonus.times - 1 };
          }
          return bonus;
        })
      };
    } else {
      return {
        ...state,
        wordBonuses: state.wordBonuses.filter(bonus => bonus.type !== bonusType)
      };
    }
  } else {
    return state;
  }
}

function toggleBingo(state) {
  if (isBingoAllowed(state.input, { languageCode: state.language })) {
    return { ...state, isBingoUsed: !state.isBingoUsed };
  }
  return state;
}
