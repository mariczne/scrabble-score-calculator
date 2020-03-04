import Word from "./Word";

test("PÓŹNOŚĆ is worth 29 points in Polish", () => {
  const word = new Word("późność", "PL");
  expect(word.score).toEqual(29);
});

test("PÓŹNOŚĆ is worth 58 points in Polish when word score is doubled", () => {
  const word = new Word("późność", "PL");
  word.addBonus("double");
  expect(word.score).toEqual(58);
});

test("PÓŹNOŚĆ is worth 58 points in Polish when word score is doubled and second letter score is tripled", () => {
  const word = new Word("późność", "PL");
  word.addBonus("double");
  word.letters[1].toggleBonus();
  word.letters[1].toggleBonus();
  expect(word.score).toEqual(78);
});

test("PÓŹNOŚĆ is worth 128 points in Polish when word score is doubled, second letter score is tripled and it's a bingo", () => {
  const word = new Word("późność", "PL");
  word.addBonus("double");
  word.letters[1].toggleBonus();
  word.letters[1].toggleBonus();
  word.toggleBingo();
  expect(word.score).toEqual(128);
});

test("LAMA is worth 6 points in Spanish", () => {
  const word = new Word("lama", "ES");
  expect(word.score).toEqual(6);
});

test("LLAMA is worth 13 points in Spanish", () => {
  const word = new Word("llama", "ES");
  expect(word.score).toEqual(13);
});