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
        bonuses: [
          ...state.bonuses,
          { type: "tile", index: tileIndex, multiplier: 2 }
        ]
      };
    }
    case "INCREMENT_TILE_MULTIPLIER": {
      const { tileIndex } = action.payload;
      return {
        ...state,
        bonuses: state.bonuses.map(tile => {
          if (tile.index === tileIndex) {
            return { ...tile, multiplier: tile.multiplier + 1 };
          }
          return tile;
        })
      };
    }
    case "ADD_WORD_MULTIPLIER": {
      const { tileIndex } = action.payload;
      return {
        ...state,
        bonuses: state.bonuses.map(tile => {
          if (tile.index === tileIndex) {
            return { ...tile, type: "word", multiplier: 2 };
          }
          return tile;
        })
      };
    }
    case "INCREMENT_WORD_MULTIPLIER": {
      const { tileIndex } = action.payload;
      return {
        ...state,
        bonuses: state.bonuses.map(tile => {
          if (tile.index === tileIndex) {
            return { ...tile, multiplier: tile.multiplier + 1 };
          }
          return tile;
        })
      };
    }
    case "REMOVE_WORD_MULTIPLIER": {
      const { tileIndex } = action.payload;
      return {
        ...state,
        bonuses: state.bonuses.filter(tile => tile.index !== tileIndex)
      };
    }
    case "TOGGLE_BINGO": {
      return { ...state, isBingoUsed: !state.isBingoUsed };
    }
    case "RESET_WORD": {
      return {
        ...state,
        input: "",
        bonuses: [],
        isBingoUsed: false
      };
    }
    default: {
      return state;
    }
  }
}
