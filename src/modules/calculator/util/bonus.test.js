import {
  getTileBonuses,
  getWordBonuses,
  getWordMultiplier,
  getWordBonusTypes,
  isBonusDefined,
  isNextBonusAllowed,
  isBingoAllowed
} from "./bonus";
let bonuses;

const wordScoreMultipliersMock = [
  { name: "double", multiplier: 2 },
  { name: "triple", multiplier: 3 }
];

beforeEach(() => {
  bonuses = [
    {
      index: 0,
      type: "tile",
      multiplier: 2
    },
    {
      index: 2,
      type: "word",
      multiplier: 2
    },
    {
      type: "bingo"
    }
  ];
});

describe("getTileBonuses", () => {
  it("should return an array containing only tile bonuses", () => {
    const expectedResult = [
      {
        index: 0,
        type: "tile",
        multiplier: 2
      }
    ];
    expect(getTileBonuses(bonuses)).toEqual(expectedResult);
  });
});

describe("getWordBonuses", () => {
  it("should return an array containing only word bonuses", () => {
    const expectedResult = [
      {
        index: 2,
        type: "word",
        multiplier: 2
      }
    ];
    expect(getWordBonuses(bonuses)).toEqual(expectedResult);
  });
});

describe("getWordMultiplier", () => {
  it("should reduce word bonuses to a single multiplier", () => {
    const wordBonuses = [
      { type: "word", index: 1, multiplier: 2 },
      { type: "word", index: 5, multiplier: 3 }
    ];

    expect(getWordMultiplier(wordBonuses)).toEqual(6);
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
    expect(isBonusDefined(5)).toEqual(false);
  });

  it("should return true if bonus is defined in the scoretable", () => {
    expect(isBonusDefined(2)).toEqual(true);
  });
});

describe("isNextBonusAllowed", () => {
  const bonuses = [
    { type: "word", index: 0, multiplier: 2 },
    { type: "word", index: 1, multiplier: 2 }
  ];

  it("should return true if there are more tiles than used bonuses", () => {
    expect(
      isNextBonusAllowed("asd", { languageCode: "eng", bonuses })
    ).toEqual(true);
  });

  it("should return false if all bonuses are taken", () => {
    expect(
      isNextBonusAllowed("as", { languageCode: "eng", bonuses })
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