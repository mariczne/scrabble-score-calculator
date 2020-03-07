import Word from "./Word";

describe("throws errors when incorrect arguments are supplied", () => {
  it("throws a TypeError when trying to create a word with something else than string as either argument", () => {
    expect(() => new Word(123, "PL")).toThrowError(TypeError);
    expect(() => new Word("123", { "PL": "PL" })).toThrowError(TypeError);
  });

  it("throws a RangeError when trying to create a word in unsupported language", () => {
    expect(() => new Word("późność", "XX")).toThrowError(RangeError);
  });
});

describe("correctly calculates word score without any bonuses", () => {
  it("PÓŹNOŚĆ is worth 29 points in Polish", () => {
    const word = new Word("późność", "PL");
    expect(word.score).toEqual(29);
  });
});

describe("correctly calculates word score with bonuses", () => {
  it("PÓŹNOŚĆ is worth 58 points in Polish when second letter score is doubled", () => {
    const word = new Word("późność", "PL");
    word.letters[1].cycleBonus();
    expect(word.score).toEqual(34);
  });

  it("PÓŹNOŚĆ is worth 58 points in Polish when word score is doubled", () => {
    const word = new Word("późność", "PL");
    word.addBonus("double");
    expect(word.score).toEqual(58);
  });

  it("PÓŹNOŚĆ is worth 58 points in Polish when word score is doubled and second letter score is tripled", () => {
    const word = new Word("późność", "PL");
    word.addBonus("double");
    word.letters[1].cycleBonus();
    word.letters[1].cycleBonus();
    expect(word.score).toEqual(78);
  });

  // trivia: best possible opening move in Polish scrabble
  it("PÓŹNOŚĆ is worth 128 points in Polish when word score is doubled, second letter score is tripled and it's a bingo", () => {
    const word = new Word("późność", "PL");
    word.addBonus("double");
    word.letters[1].cycleBonus();
    word.letters[1].cycleBonus();
    word.toggleBingo();
    expect(word.score).toEqual(128);
  });
});

describe("word score is NaN when at least one letter is not in the scoretable", () => {
  it("XERO score is NaN in Polish", () => {
    const word = new Word("xero", "PL");
    expect(word.score).toEqual(NaN);
  });
});

describe("correctly calculates score for words with digraphs in languages that support them", () => {
  it("LAMA is worth 6 points in Spanish", () => {
    const word = new Word("lama", "ES");
    expect(word.score).toEqual(6);
  });

  it("LLAMA is worth 13 points in Spanish", () => {
    const word = new Word("llama", "ES");
    expect(word.score).toEqual(13);
  });
});
