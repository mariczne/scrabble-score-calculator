import { WORD_SCORE_MULTIPLIERS } from "../constants/settings";
import {
  isBonusDefinedInScoretable,
  checkIsBonusDefinedInScoretable
} from "./bonus";
let bonus;

beforeEach(() => {
  bonus = { wordScoreMultipliers: WORD_SCORE_MULTIPLIERS };
});

describe("isBonusDefinedInScoretable", () => {
  it("should return false if bonus is not defined in the scoretable", () => {
    bonus.bonusType = "quintuple";
    expect(isBonusDefinedInScoretable(bonus)).toEqual(false);
  });

  it("should return true if bonus is defined in the scoretable", () => {
    bonus.bonusType = "double";
    expect(isBonusDefinedInScoretable(bonus)).toEqual(true);
  });
});

describe("checkIsBonusDefinedInScoretable", () => {
  it("should throw a RangeError if bonus is not defined in the scoretable", () => {
    bonus.bonusType = "quintuple";
    expect(() => checkIsBonusDefinedInScoretable(bonus)).toThrow(RangeError);
  });
});
