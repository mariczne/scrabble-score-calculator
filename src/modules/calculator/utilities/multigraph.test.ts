import SCORE_TABLE from "../scoreTable";
import {
  processMultigraphs,
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage,
} from "./multigraph";

describe("isLanguageWithMultigraphs", () => {
  it("should return false if language doesn't have any multigraphs", () => {
    expect(isLanguageWithMultigraphs(SCORE_TABLE, "pol")).toEqual(false);
  });

  it("should return true if language has multigraphs", () => {
    expect(isLanguageWithMultigraphs(SCORE_TABLE, "hun")).toEqual(true);
  });
});

describe("getMultigraphsInLanguage", () => {
  it("should return an empty array if language doesn't have any multigraphs", () => {
    expect(getMultigraphsInLanguage(SCORE_TABLE, "pol")).toEqual([]);
  });

  it("should return an array of multigraphs if language has multigraphs", () => {
    const spanishMultigraphs = [
      ["C", "H"],
      ["L", "L"],
      ["R", "R"],
    ];

    expect(getMultigraphsInLanguage(SCORE_TABLE, "spa")).toEqual(
      spanishMultigraphs
    );
  });
});

describe("processMultigraphs", () => {
  it("should return a new array", () => {
    const multigraphs = getMultigraphsInLanguage(SCORE_TABLE, "hun");
    const wordBefore = Array.from("nem");

    expect(processMultigraphs(wordBefore, multigraphs)).not.toBe(wordBefore);
    // but, in this case, their contents should not differ
    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordBefore);
  });

  it("should return an array where adjacent multigraph elements are joined", () => {
    const multigraphs = getMultigraphsInLanguage(SCORE_TABLE, "hun");
    const wordBefore = Array.from("szeged".toUpperCase());
    const wordAfter = ["SZ", "E", "G", "E", "D"];

    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordAfter);
  });

  it("should return an array where two or more of the same multigraphs are joined", () => {
    const multigraphs = getMultigraphsInLanguage(SCORE_TABLE, "hun");
    const wordBefore = Array.from("szeszes".toUpperCase());
    const wordAfter = ["SZ", "E", "SZ", "E", "S"];

    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordAfter);
  });

  it("should return an array where all (different) multigraph elements are joined", () => {
    const multigraphs = getMultigraphsInLanguage(SCORE_TABLE, "hun");
    const wordBefore = Array.from("nagyszülőd".toUpperCase());
    const wordAfter = ["N", "A", "GY", "SZ", "Ü", "L", "Ő", "D"];

    expect(processMultigraphs(wordBefore, multigraphs)).toEqual(wordAfter);
  });
});
