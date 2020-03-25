import { setInput, changeLanguage, cycleTileBonus, toggleBingo } from "./word";

const mockState = {};

beforeEach(() => {
  mockState.input = "test";
  mockState.language = "pol";
  mockState.bonuses = [];
  mockState.isBingoUsed = false;
});

describe("setInput", () => {
  it("should create an action object of type SET_INPUT", () => {
    const expectedAction = { type: "SET_INPUT", payload: { input: "test" } };
    expect(setInput("test")).toEqual(expectedAction);
  });
});

describe("changeLanguage", () => {
  it("should create an action object of type CHANGE_LANGUAGE", () => {
    const expectedAction = {
      type: "CHANGE_LANGUAGE",
      payload: { language: "pol" }
    };
    expect(changeLanguage("pol")).toEqual(expectedAction);
  });
});

describe("cycleTileBonus", () => {
  it("should create an action object of type ADD_TILE_BONUS", () => {
    const expectedAction = {
      type: "ADD_TILE_BONUS",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type INCREMENT_TILE_MULTIPLIER", () => {
    mockState.bonuses = [{ index: 2, multiplier: 2, type: "tile" }];
    const expectedAction = {
      type: "INCREMENT_TILE_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type ADD_WORD_MULTIPLIER", () => {
    mockState.bonuses = [{ index: 2, multiplier: 3, type: "tile" }];
    const expectedAction = {
      type: "ADD_WORD_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type INCREMENT_WORD_MULTIPLIER", () => {
    mockState.bonuses = [{ index: 2, multiplier: 2, type: "word" }];
    const expectedAction = {
      type: "INCREMENT_WORD_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type REMOVE_WORD_MULTIPLIER", () => {
    mockState.bonuses = [{ index: 2, multiplier: 3, type: "word" }];
    const expectedAction = {
      type: "REMOVE_WORD_MULTIPLIER",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });
});

describe("toggleBingo", () => {
  it("should create an action object of type ACTION_CANCELLED", () => {
    const expectedAction = { type: "ACTION_CANCELLED" };
    expect(toggleBingo(mockState)).toEqual(expectedAction);
  });

  it("should create an action object of type TOGGLE_BINGO", () => {
    mockState.input = "testasd";
    const expectedAction = { type: "TOGGLE_BINGO" };
    expect(toggleBingo(mockState)).toEqual(expectedAction);
  });
});
