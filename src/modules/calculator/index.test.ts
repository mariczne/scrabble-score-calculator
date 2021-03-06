import { getTileScore, getWordScore } from ".";
import { BonusType } from "./interfaces";

describe("getTileScore", () => {
  it("calculates tile score for different supported languages", () => {
    const F_scoreInPolish = getTileScore("F", {
      languageCode: "pol",
    });
    const F_scoreInEnglish = getTileScore("F", {
      languageCode: "eng",
    });

    expect(F_scoreInPolish).toEqual(5);
    expect(F_scoreInEnglish).toEqual(4);
  });

  it("calculates tile score with a multiplier", () => {
    const F_scoreInPolish = getTileScore("F", {
      languageCode: "pol",
      multiplier: 3,
    });

    expect(F_scoreInPolish).toEqual(15);
  });

  it("calculates tile score for a multigraph", () => {
    const SZ_scoreInHungarian = getTileScore("SZ", {
      languageCode: "hun",
    });

    expect(SZ_scoreInHungarian).toEqual(3);
  });
});

describe("getWordScore", () => {
  it("word score of an empty string is 0", () => {
    const wordScore = getWordScore("", { languageCode: "pol" });

    expect(wordScore).toEqual(0);
  });

  it("calculates word score without any bonuses", () => {
    const wordScore = getWordScore("późność", {
      languageCode: "pol",
    });

    expect(wordScore).toEqual(29);
  });

  it("calculates word score when some tiles have bonuses", () => {
    const wordScore = getWordScore("późność", {
      languageCode: "pol",
      bonuses: [
        { type: BonusType.Tile, index: 1, multiplier: 2 },
        { type: BonusType.Tile, index: 5, multiplier: 3 },
      ],
    });

    expect(wordScore).toEqual(44);
  });

  it("calculates word score when there are word bonuses", () => {
    const wordScore = getWordScore("późność", {
      languageCode: "pol",
      bonuses: [
        { type: BonusType.Word, index: 1, multiplier: 2 },
        { type: BonusType.Word, index: 5, multiplier: 2 },
      ],
    });

    expect(wordScore).toEqual(116);
  });

  it("calculates word score when there are both word and letter bonuses", () => {
    const wordScore = getWordScore("późność", {
      languageCode: "pol",
      bonuses: [
        { type: BonusType.Word, index: 1, multiplier: 2 },
        { type: BonusType.Word, index: 5, multiplier: 2 },
        { type: BonusType.Tile, index: 2, multiplier: 3 },
      ],
    });

    expect(wordScore).toEqual(188);
  });

  it("adds points for bingo to the total score", () => {
    const wordScore = getWordScore("późność", {
      languageCode: "pol",
      isBingoUsed: true,
    });

    expect(wordScore).toEqual(79);
  });

  it("returns NaN for word score when at least one letter is not in the scoretable", () => {
    const wordScore = getWordScore("xero", {
      languageCode: "pol",
    });

    expect(wordScore).toEqual(NaN);
  });

  it("calculates score for words with digraphs in languages that support them", () => {
    const lamaScore = getWordScore("lama", {
      languageCode: "spa",
    });
    const llamaScore = getWordScore("llama", {
      languageCode: "spa",
    });

    expect(lamaScore).toEqual(6);
    expect(llamaScore).toEqual(13);
  });
});
