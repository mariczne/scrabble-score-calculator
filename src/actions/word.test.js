import {
  setInput,
  changeLanguage,
  cycleTileBonus,
  addWordBonus,
  removeWordBonus,
  toggleBingo
} from "./word";

const mockState = {};

beforeEach(() => {
  mockState.input = "test";
  mockState.language = "pol";
  mockState.wordBonuses = [];
  mockState.tileBonuses = [];
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

  it("should create an action object of type ADD_TILE_BONUS", () => {
    mockState.tileBonuses = [{ index: 2, multiplier: 2 }];
    const expectedAction = {
      type: "INCREMENT_TILE_BONUS",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type REMOVE_TILE_BONUS", () => {
    mockState.tileBonuses = [{ index: 2, multiplier: 3 }];
    const expectedAction = {
      type: "REMOVE_TILE_BONUS",
      payload: { tileIndex: 2 }
    };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type ACTION_CANCELLED", () => {
    mockState.tileBonuses = [];
    mockState.wordBonuses = [{ type: "double", times: 4 }];
    const expectedAction = { type: "ACTION_CANCELLED" };
    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });
});

describe("addWordBonus", () => {
  it("should create an action object of type ADD_WORD_BONUS", () => {
    const expectedAction = {
      type: "ADD_WORD_BONUS",
      payload: { bonusType: "triple" }
    };
    expect(addWordBonus(mockState, "triple")).toEqual(expectedAction);
  });

  it("should create an action object of type INCREMENT_WORD_BONUS_COUNT", () => {
    mockState.wordBonuses = [{ type: "triple", times: 1 }];
    const expectedAction = {
      type: "INCREMENT_WORD_BONUS_COUNT",
      payload: { bonusType: "triple" }
    };
    expect(addWordBonus(mockState, "triple")).toEqual(expectedAction);
  });

  it("should create an action object of type ACTION_CANCELLED", () => {
    mockState.wordBonuses = [{ type: "triple", times: 4 }];
    const expectedAction = { type: "ACTION_CANCELLED" };
    expect(addWordBonus(mockState, "triple")).toEqual(expectedAction);
  });
});

describe("removeWordBonus", () => {
  it("should create an action object of type REMOVE_WORD_BONUS", () => {
    mockState.wordBonuses = [{ type: "triple", times: 1 }];
    const expectedAction = {
      type: "REMOVE_WORD_BONUS",
      payload: { bonusType: "triple" }
    };
    expect(removeWordBonus(mockState, "triple")).toEqual(expectedAction);
  });

  it("should create an action object of type DECREMENT_WORD_BONUS_COUNT", () => {
    mockState.wordBonuses = [{ type: "triple", times: 2 }];
    const expectedAction = {
      type: "DECREMENT_WORD_BONUS_COUNT",
      payload: { bonusType: "triple" }
    };
    expect(removeWordBonus(mockState, "triple")).toEqual(expectedAction);
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
