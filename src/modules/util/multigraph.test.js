import {
  processMultigraphs,
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage
} from "./multigraph";
import { SCORE_TABLE } from "../scoretable";
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
    const wordBefore = Array.from("nem");
    expect(processMultigraphs(wordBefore, language)).not.toBe(wordBefore);
    // but, in this case, their contents should not differ
    expect(processMultigraphs(wordBefore, language)).toEqual(wordBefore);
  });

  it("should return an array where adjacent multigraph elements are joined", () => {
    language.languageCode = "hun";
    const wordBefore = Array.from("szeged".toUpperCase());
    const wordAfter = ["SZ", "E", "G", "E", "D"];

    expect(processMultigraphs(wordBefore, language)).toEqual(wordAfter);
  });
});
