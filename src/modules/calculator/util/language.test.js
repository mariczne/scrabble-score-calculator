import { isLanguageDefined, getSupportedLanguages } from "./language";

const mockScoreTable = {
  eng: {
    displayName: "English"
  },
  pol: {
    displayName: "polski"
  }
};

let language;

beforeEach(() => {
  language = { scoreTable: mockScoreTable };
});

describe("isLanguageDefined", () => {
  it("should return false if language is not defined in the scoretable", () => {
    language.languageCode = "xyz";
    expect(isLanguageDefined(language)).toEqual(false);
  });

  it("should return true if language is defined in the scoretable", () => {
    language.languageCode = "pol";
    expect(isLanguageDefined(language)).toEqual(true);
  });
});

describe("getSupportedLanguages", () => {
  it("should return an array with objects representing language's code and display name", () => {
    const expectedResults = [
      { languageCode: "eng", displayName: "English" },
      { languageCode: "pol", displayName: "polski" }
    ];

    expect(getSupportedLanguages(mockScoreTable)).toEqual(expectedResults);
  });
});
