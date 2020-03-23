import { checkIsBonusDefined, checkIsLanguageDefined } from "./error";

describe("checkIsBonusDefined", () => {
  it("should throw a RangeError if bonus is not defined in the scoretable", () => {
    expect(() => checkIsBonusDefined({ bonusType: "quintuple" })).toThrow(
      RangeError
    );
  });
});

describe("checkIsLanguageDefined", () => {
  it("should throw a RangeError if language is not defined in the scoretable", () => {
    expect(() => checkIsLanguageDefined({ languageCode: "xyz" })).toThrow(
      RangeError
    );
  });
});
