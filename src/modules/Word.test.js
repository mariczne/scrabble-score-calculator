import Word from "./Word";

describe("throws errors when incorrect arguments are supplied", () => {
  it("throws a TypeError when trying to create a word with something else than string as either argument", () => {
    expect(() => new Word(123, "pol")).toThrowError(TypeError);
    expect(() => new Word("123", { PL: "pol" })).toThrowError(TypeError);
  });

  it("throws a RangeError when trying to create a word in unsupported language", () => {
    expect(() => new Word("późność", "XX")).toThrowError(RangeError);
  });
});

it("calculates word score without any bonuses", () => {
  const word = new Word("późność", "pol");

  expect(word.score).toEqual(29);
});

describe("calculates word score with bonuses", () => {
  it("calculates word score when any letter score is doubled", () => {
    const word = new Word("późność", "pol");

    word.letters[1].scoreMultiplier = 2;

    expect(word.score).toEqual(34);
  });

  it("calculates word score when word score is doubled", () => {
    const word = new Word("późność", "pol");

    word.addBonus("double");

    expect(word.score).toEqual(58);
  });

  it("calculates word score when word score is tripled", () => {
    const word = new Word("późność", "pol");

    word.addBonus("triple");

    expect(word.score).toEqual(87);
  });

  it("calculates word score when word score is doubled and any letter score is tripled", () => {
    const word = new Word("późność", "pol");

    word.addBonus("double");
    word.letters[1].scoreMultiplier = 3;

    expect(word.score).toEqual(78);
  });

  // trivia: best possible opening move in Polish scrabble
  it("calculates word score when word score is doubled, second letter score is tripled and it's a bingo", () => {
    const word = new Word("późność", "pol");

    word.addBonus("double");
    word.letters[1].scoreMultiplier = 3;
    word.toggleBingo();

    expect(word.score).toEqual(128);
  });

  it("calculates word score when word score is tripled twice (9x multiplier)", () => {
    const word = new Word("późność", "pol");

    word.addBonus("triple", 2);

    expect(word.score).toEqual(261);
  });
});

it("returns NaN for word score when at least one letter is not in the scoretable", () => {
  const word = new Word("xero", "pol");

  expect(word.score).toEqual(NaN);
});

it("can't add more word bonuses than total amount of letters", () => {
  const word = new Word("bo", "pol");

  word.addBonus("double");
  word.addBonus("triple", 2);

  expect(word.score).toEqual(24);
});

it("won't remove more word bonuses of certain type than there are already added", () => {
  const word = new Word("test", "pol");

  word.addBonus("double", 3);
  word.removeBonus("double", 5);

  expect(word.score).toEqual(6);
});

it("calculates score for words with digraphs in languages that support them", () => {
  const lama = new Word("lama", "spa");
  const llama = new Word("llama", "spa");

  expect(lama.score).toEqual(6);
  expect(lama.letters.length).toEqual(4);
  expect(llama.score).toEqual(13);
  expect(llama.letters.length).toEqual(4);
});

it("calculates score for words with trigraphs in languages that support them", () => {
  const word = new Word("oozhrii", "gwi");

  expect(word.letters.length).toEqual(3);
  expect(word.score).toEqual(13);
});
