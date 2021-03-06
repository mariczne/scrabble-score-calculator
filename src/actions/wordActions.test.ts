import {
  setInput,
  changeLanguage,
  cycleTileBonus,
  toggleBingo,
} from "./wordActions";
import { MIN_TILES_FOR_BINGO } from "../modules/calculator/settings";
import { BonusType } from "../modules/calculator/interfaces";

const mockState = {
  input: "test",
  language: "pol",
  bonuses: [],
  isBingoUsed: false,
};

describe("setInput", () => {
  it("should create an action object of type SET_INPUT", () => {
    const expectedAction = {
      type: "INPUT_CHANGED",
      payload: { input: "test", minTilesForBingo: MIN_TILES_FOR_BINGO },
    };

    expect(setInput("test")).toEqual(expectedAction);
  });
});

describe("changeLanguage", () => {
  it("should create an action object of type CHANGE_LANGUAGE", () => {
    const expectedAction = {
      type: "LANGUAGE_CHANGED",
      payload: { language: "pol" },
    };

    expect(changeLanguage("pol")).toEqual(expectedAction);
  });
});

describe("cycleTileBonus", () => {
  it("should create an action object of type ADD_TILE_BONUS", () => {
    const expectedAction = {
      type: "TILE_MULTIPLIER_ADDED",
      payload: { tileIndex: 2 },
    };

    expect(cycleTileBonus(mockState, 2)).toEqual(expectedAction);
  });

  it("should create an action object of type INCREMENT_TILE_MULTIPLIER", () => {
    const bonuses = [{ index: 2, multiplier: 2, type: BonusType.Tile }];
    const expectedAction = {
      type: "TILE_MULTIPLIER_INCREMENTED",
      payload: { tileIndex: 2 },
    };

    expect(cycleTileBonus({ ...mockState, bonuses }, 2)).toEqual(
      expectedAction
    );
  });

  it("should create an action object of type ADD_WORD_MULTIPLIER", () => {
    const bonuses = [{ index: 2, multiplier: 3, type: BonusType.Tile }];
    const expectedAction = {
      type: "WORD_MULTIPLIER_ADDED",
      payload: { tileIndex: 2 },
    };

    expect(cycleTileBonus({ ...mockState, bonuses }, 2)).toEqual(
      expectedAction
    );
  });

  it("should create an action object of type INCREMENT_WORD_MULTIPLIER", () => {
    const bonuses = [{ index: 2, multiplier: 2, type: BonusType.Word }];
    const expectedAction = {
      type: "WORD_MULTIPLIER_INCREMENTED",
      payload: { tileIndex: 2 },
    };

    expect(cycleTileBonus({ ...mockState, bonuses }, 2)).toEqual(
      expectedAction
    );
  });

  it("should create an action object of type REMOVE_WORD_MULTIPLIER", () => {
    const bonuses = [{ index: 2, multiplier: 3, type: BonusType.Word }];
    const expectedAction = {
      type: "WORD_MULTIPLIER_REMOVED",
      payload: { tileIndex: 2 },
    };

    expect(cycleTileBonus({ ...mockState, bonuses }, 2)).toEqual(
      expectedAction
    );
  });
});

describe("toggleBingo", () => {
  it("should create an action object of type ACTION_CANCELLED", () => {
    const expectedAction = { type: "ACTION_CANCELLED" };

    expect(toggleBingo(mockState)).toEqual(expectedAction);
  });

  it("should create an action object of type TOGGLE_BINGO", () => {
    const input = "testasd";
    const expectedAction = { type: "BINGO_TOGGLED" };

    expect(toggleBingo({ ...mockState, input })).toEqual(expectedAction);
  });
});
