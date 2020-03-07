import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

const app = render(<App />);
const wordInput = app.getByTestId("word-input");
const wordScore = app.getByTestId("word-score");
const langSelect = app.getByTestId("lang-select");

it("correctly renders score of a word", () => {
  expect(wordInput.value).toBe("");
  expect(wordScore.textContent).toEqual("0");
  fireEvent.change(wordInput, { target: { value: "szkrabble" } });
  expect(wordInput.value).toBe("szkrabble");
  expect(wordScore.textContent).toEqual("26");
});

xit("correctly renders score of a word in different language", () => {
  fireEvent.change(langSelect, { target: { value: "PL" } });
  expect(wordScore.textContent).toEqual("15");
});
