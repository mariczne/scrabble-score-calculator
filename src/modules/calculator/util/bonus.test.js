import {
  getWordMultiplier,
  getWordBonusTypes,
  isBonusDefined,
  timesBonusTypeUsed,
  isNextBonusAllowed,
  isBingoAllowed
} from "./bonus";
let bonus;

const wordScoreMultipliersMock = {
  double: 2,
  triple: 3
};

beforeEach(() => {
  bonus = { wordScoreMultipliers: wordScoreMultipliersMock };
});

describe("getWordMultiplier", () => {
  it("should reduce word bonuses to a single multiplier", () => {
    const wordBonuses = [
      { type: "double", times: 2 },
      { type: "triple", times: 1 }
    ];

    expect(getWordMultiplier(wordBonuses)).toEqual(12);
  });
});

describe("getWordBonusTypes", () => {
  it("should return an array of allowed bonus types", () => {
    expect(getWordBonusTypes(wordScoreMultipliersMock)).toEqual([
      "double",
      "triple"
    ]);
  });
});

describe("isBonusDefined", () => {
  it("should return false if bonus is not defined in the scoretable", () => {
    bonus.bonusType = "quintuple";
    expect(isBonusDefined(bonus)).toEqual(false);
  });

  it("should return true if bonus is defined in the scoretable", () => {
    bonus.bonusType = "double";
    expect(isBonusDefined(bonus)).toEqual(true);
  });
});

describe("timesBonusTypeUsed", () => {
  const wordBonuses = [{ type: "double", times: 2 }];

  it("should return the number of times that a bonus is used", () => {
    expect(timesBonusTypeUsed("double", wordBonuses)).toEqual(2);
  });
});

describe("isNextBonusAllowed", () => {
  const wordBonuses = [{ type: "double", times: 2 }];

  it("should return true if there are more tiles than used bonuses", () => {
    expect(
      isNextBonusAllowed("asd", { languageCode: "eng", wordBonuses })
    ).toEqual(true);
  });

  it("should return false if all bonuses are taken", () => {
    expect(
      isNextBonusAllowed("as", { languageCode: "eng", wordBonuses })
    ).toEqual(false);
  });
});

describe("isBingoAllowed", () => {
  it("should return true if there are enough tiles used for a bingo", () => {
    // default is 7 tiles
    expect(isBingoAllowed("abrakadabra", { languageCode: "eng" })).toEqual(
      true
    );
    expect(isBingoAllowed("zamało", { languageCode: "eng" })).toEqual(false);
  });
});
