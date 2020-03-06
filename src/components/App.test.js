import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("correctly renders score of a word", () => {
  const app = render(<App />);
  const wordInput = app.getByRole("searchbox");
  const wordScore = app.getByTestId("word-score");
  expect(wordInput.value).toBe("");
  expect(wordScore.textContent).toEqual("0");
  fireEvent.change(wordInput, { target: { value: "scrabble" } });
  expect(wordInput.value).toBe("scrabble");
  expect(wordScore.textContent).toEqual("14");
});
