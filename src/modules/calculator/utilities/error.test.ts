import { checkIsBonusDefined, checkIsLanguageDefined } from "./error";
import SCORE_TABLE from "../scoreTable";

describe("checkIsBonusDefined", () => {
  it("should throw a RangeError if bonus is not defined in the scoretable", () => {
    expect(() => checkIsBonusDefined(6)).toThrow(RangeError);
  });
});

describe("checkIsLanguageDefined", () => {
  it("should throw a RangeError if language is not defined in the scoretable", () => {
    expect(() => checkIsLanguageDefined(SCORE_TABLE, "xyz")).toThrow(
      RangeError
    );
  });
});
