export default function wordReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT": {
      const { input } = action.payload;
      return { ...state, input };
    }
    case "CHANGE_LANGUAGE": {
      const { language } = action.payload;
      return { ...state, language };
    }
    case "ADD_TILE_BONUS": {
      const { tileIndex } = action.payload;
      return {
        ...state,
        tileBonuses: [...state.tileBonuses, { index: tileIndex, multiplier: 2 }]
      };
    }
    case "INCREMENT_TILE_BONUS": {
      const { tileIndex } = action.payload;
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
    case "REMOVE_TILE_BONUS": {
      const { tileIndex } = action.payload;
      return {
        ...state,
        tileBonuses: state.tileBonuses.filter(tile => tile.index !== tileIndex)
      };
    }
    case "ADD_WORD_BONUS": {
      const { bonusType } = action.payload;
      return {
        ...state,
        wordBonuses: [...state.wordBonuses, { type: bonusType, times: 1 }]
      };
    }
    case "INCREMENT_WORD_BONUS_COUNT": {
      const { bonusType } = action.payload;
      return {
        ...state,
        wordBonuses: state.wordBonuses.map(bonus => {
          if (bonus.type === bonusType) {
            return { ...bonus, times: bonus.times + 1 };
          }
          return bonus;
        })
      };
    }
    case "REMOVE_WORD_BONUS": {
      const { bonusType } = action.payload;
      return {
        ...state,
        wordBonuses: state.wordBonuses.filter(bonus => bonus.type !== bonusType)
      };
    }
    case "DECREMENT_WORD_BONUS_COUNT": {
      const { bonusType } = action.payload;
      return {
        ...state,
        wordBonuses: state.wordBonuses.map(bonus => {
          if (bonus.type === bonusType) {
            return { ...bonus, times: bonus.times - 1 };
          }
          return bonus;
        })
      };
    }
    case "TOGGLE_BINGO": {
      return { ...state, isBingoUsed: !state.isBingoUsed };
    }
    case "RESET_WORD": {
      return {
        ...state,
        input: "",
        wordBonuses: [],
        tileBonuses: [],
        isBingoUsed: false
      };
    }
    default: {
      return state;
    }
  }
}
