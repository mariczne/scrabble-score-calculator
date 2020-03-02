// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import Word from "./Word";
import Letter from "./Letter";

test("F is worth 5 points in Polish", () => {
  const F = new Letter(0, "F", "PL");
  expect(F.score).toEqual(5);
});

test("F is worth 4 points in English", () => {
  const F = new Letter(0, "F", "EN");
  expect(F.score).toEqual(4);
});

test("F clicked (with doubled letter score) is worth 10 points in Polish", () => {
  const F = new Letter(0, "F", "PL");
  F.toggleBonus();
  expect(F.score).toEqual(10);
});

test("F clicked two times (with tripled letter score) is worth 15 points in Polish", () => {
  const F = new Letter(0, "F", "PL");
  F.toggleBonus();
  F.toggleBonus();
  expect(F.score).toEqual(15);
});

test("F clicked three times is worth 5 points in Polish", () => {
  const F = new Letter(0, "F", "PL");
  F.toggleBonus();
  F.toggleBonus();
  F.toggleBonus();
  expect(F.score).toEqual(5);
});

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
