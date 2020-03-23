import SCORE_TABLE from "../scoreTable";
import {
  processMultigraphs,
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage
} from "./multigraph";
let language;

beforeEach(() => {
  language = { scoreTable: SCORE_TABLE };
});

describe("isLanguageWithMultigraphs", () => {
  it("should return false if language doesn't have any multigraphs", () => {
    language.languageCode = "pol";

    expect(isLanguageWithMultigraphs(language)).toEqual(false);
  });

  it("should return true if language has multigraphs", () => {
    language.languageCode = "hun";

    expect(isLanguageWithMultigraphs(language)).toEqual(true);
  });
});

describe("getMultigraphsInLanguage", () => {
  it("should return an empty array if language doesn't have any multigraphs", () => {
    language.languageCode = "pol";

    expect(getMultigraphsInLanguage(language)).toEqual([]);
  });

  it("should return an array of multigraphs if language has multigraphs", () => {
    language.languageCode = "spa";
    const spanishMultigraphs = [
      ["C", "H"],
      ["L", "L"],
      ["R", "R"]
    ];

    expect(getMultigraphsInLanguage(language)).toEqual(spanishMultigraphs);
  });
});

describe("processMultigraphs", () => {
  it("should return a new array", () => {
    language.languageCode = "hun";
    const multigraphs = getMultigraphsInLanguage(language);
    const wordBefore = Array.from("nem");

    expect(processMultigraphs(wordBefore, multigraphs)).not.toBe(wordBefore);
    // but, in this case, their contents should not differ
    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordBefore);
  });

  it("should return an array where adjacent multigraph elements are joined", () => {
    language.languageCode = "hun";
    const multigraphs = getMultigraphsInLanguage(language);
    const wordBefore = Array.from("szeged".toUpperCase());
    const wordAfter = ["SZ", "E", "G", "E", "D"];

    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordAfter);
  });

  it("should return an array where two or more of the same multigraphs are joined", () => {
    language.languageCode = "hun";
    const multigraphs = getMultigraphsInLanguage(language);
    const wordBefore = Array.from("szeszes".toUpperCase());
    const wordAfter = ["SZ", "E", "SZ", "E", "S"];

    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordAfter);
  });

  it("should return an array where all (different) multigraph elements are joined", () => {
    language.languageCode = "hun";
    const multigraphs = getMultigraphsInLanguage(language);
    const wordBefore = Array.from("nagyszülőd".toUpperCase());
    const wordAfter = ["N", "A", "GY", "SZ", "Ü", "L", "Ő", "D"];

    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordAfter);
  });
});
