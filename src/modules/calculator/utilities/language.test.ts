import { isLanguageDefined, getSupportedLanguages } from "./language";

const mockScoreTable = {
  eng: {
    displayName: "English",
  },
  pol: {
    displayName: "polski",
  },
};

describe("isLanguageDefined", () => {
  it("should return false if language is not defined in the scoretable", () => {
    expect(isLanguageDefined(mockScoreTable, "xyz")).toEqual(false);
  });

  it("should return true if language is defined in the scoretable", () => {
    expect(isLanguageDefined(mockScoreTable, "pol")).toEqual(true);
  });
});

describe("getSupportedLanguages", () => {
  it("should return an array with objects representing language's code and display name", () => {
    const expectedResults = [
      { languageCode: "eng", displayName: "English" },
      { languageCode: "pol", displayName: "polski" },
    ];

    expect(getSupportedLanguages(mockScoreTable)).toEqual(expectedResults);
  });
});
