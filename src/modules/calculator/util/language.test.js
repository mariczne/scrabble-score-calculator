import { isLanguageDefined } from "./language";
import SCORE_TABLE from "../scoreTable";
let language;

beforeEach(() => {
  language = { scoreTable: SCORE_TABLE };
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
