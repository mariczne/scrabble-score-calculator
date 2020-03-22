import {
  isLanguageDefinedInScoretable,
  checkIsLanguageDefinedInScoretable
} from "./language";
import { SCORE_TABLE } from "../../constants/scoretable";
let language;

beforeEach(() => {
  language = { scoreTable: SCORE_TABLE };
});

describe("isLanguageDefinedInScoretable", () => {
  it("should return false if language is not defined in the scoretable", () => {
    language.languageCode = "xyz";
    expect(isLanguageDefinedInScoretable(language)).toEqual(false);
  });
  
  it("should return true if language is defined in the scoretable", () => {
    language.languageCode = "pol";
    expect(isLanguageDefinedInScoretable(language)).toEqual(true);
  });
});

describe("checkIsLanguageDefinedInScoretable", () => {
  it("should throw a RangeError if language is not defined in the scoretable", () => {
    language.languageCode = "xyz";
    expect(() => checkIsLanguageDefinedInScoretable(language)).toThrow(RangeError);
  });
});
