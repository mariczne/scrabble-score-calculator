import wordReducer from "./wordReducer";

const mockState = {};
beforeEach(() => {
  mockState.input = "test";
  mockState.language = "pol";
  mockState.bonuses = [];
  mockState.isBingoUsed = false;
});

describe("wordReducer", () => {
  it("should handle ACTION_CANCELLED action", () => {
    const action = { type: "ACTION_CANCELLED" };
    const expectedState = { ...mockState };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle SET_INPUT action", () => {
    const action = { type: "SET_INPUT", payload: { input: "testasd" } };
    const expectedState = { ...mockState, input: "testasd" };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle CHANGE_LANGUAGE action", () => {
    const action = { type: "CHANGE_LANGUAGE", payload: { language: "eng" } };
    const expectedState = { ...mockState, language: "eng" };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle ADD_TILE_BONUS action", () => {
    const action = {
      type: "ADD_TILE_BONUS",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      bonuses: [{ type: "tile", index: 2, multiplier: 2 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle INCREMENT_TILE_MULTIPLIER action", () => {
    mockState.bonuses = [{ type: "tile", index: 2, multiplier: 2 }];
    const action = {
      type: "INCREMENT_TILE_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      bonuses: [{ type: "tile", index: 2, multiplier: 3 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle ADD_WORD_MULTIPLIER action", () => {
    mockState.bonuses = [{ type: "tile", index: 2, multiplier: 3 }];
    const action = {
      type: "ADD_WORD_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      bonuses: [{ type: "word", index: 2, multiplier: 2 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle INCREMENT_WORD_MULTIPLIER action", () => {
    mockState.bonuses = [{ type: "word", index: 2, multiplier: 2 }];
    const action = {
      type: "INCREMENT_WORD_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      bonuses: [{ type: "word", index: 2, multiplier: 3 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_WORD_MULTIPLIER action", () => {
    mockState.bonuses = [{ type: "word", index: 2, multiplier: 3 }];
    const action = {
      type: "REMOVE_WORD_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      bonuses: []
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle TOGGLE_BINGO action", () => {
    const action = {
      type: "TOGGLE_BINGO"
    };
    const expectedState = {
      ...mockState,
      isBingoUsed: true
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);

    const expectedStateSecondToggle = { ...expectedState, isBingoUsed: false };
    expect(wordReducer(expectedState, action)).toEqual(
      expectedStateSecondToggle
    );
  });

  it("should handle RESET_WORD action", () => {
    const action = {
      type: "RESET_WORD"
    };
    const expectedState = {
      ...mockState,
      input: "",
      bonuses: [],
      isBingoUsed: false
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });
});
