import wordReducer from "./wordReducer";

const mockState = {};
beforeEach(() => {
  mockState.input = "test";
  mockState.language = "pol";
  mockState.wordBonuses = [];
  mockState.tileBonuses = [];
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
      payload: { tileIndex: 2, multiplier: 2 }
    };
    const expectedState = {
      ...mockState,
      tileBonuses: [{ index: 2, multiplier: 2 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle INCREMENT_TILE_BONUS action", () => {
    mockState.tileBonuses = [{ index: 2, multiplier: 2 }];
    const action = {
      type: "INCREMENT_TILE_BONUS",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      tileBonuses: [{ index: 2, multiplier: 3 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_TILE_BONUS action", () => {
    mockState.tileBonuses = [{ index: 2, multiplier: 3 }];
    const action = {
      type: "REMOVE_TILE_BONUS",
      payload: { tileIndex: 2 }
    };
    const expectedState = {
      ...mockState,
      tileBonuses: []
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle ADD_WORD_BONUS action", () => {
    const action = {
      type: "ADD_WORD_BONUS",
      payload: { bonusType: "double" }
    };
    const expectedState = {
      ...mockState,
      wordBonuses: [{ type: "double", times: 1 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle INCREMENT_WORD_BONUS_COUNT action", () => {
    mockState.wordBonuses = [{ type: "double", times: 1 }];
    const action = {
      type: "INCREMENT_WORD_BONUS_COUNT",
      payload: { bonusType: "double" }
    };
    const expectedState = {
      ...mockState,
      wordBonuses: [{ type: "double", times: 2 }]
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_WORD_BONUS action", () => {
    mockState.wordBonuses = [{ type: "double", times: 1 }];
    const action = {
      type: "REMOVE_WORD_BONUS",
      payload: { bonusType: "double" }
    };
    const expectedState = {
      ...mockState,
      wordBonuses: []
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });

  it("should handle DECREMENT_WORD_BONUS_COUNT action", () => {
    mockState.wordBonuses = [{ type: "double", times: 2 }];
    const action = {
      type: "DECREMENT_WORD_BONUS_COUNT",
      payload: { bonusType: "double" }
    };
    const expectedState = {
      ...mockState,
      wordBonuses: [{ type: "double", times: 1 }]
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
      wordBonuses: [],
      tileBonuses: [],
      isBingoUsed: false
    };
    expect(wordReducer(mockState, action)).toEqual(expectedState);
  });
});
