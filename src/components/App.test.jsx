// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import App from "./App";


test.skip('skip', () => {})
// import { unmountComponentAtNode } from "react-dom";

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it("correctly renders calculated score of a word", () => {
//   const app = render(<App />);
//   const wordInput = app.getByTestId("word-input");
//   const wordScore = app.getByTestId("word-score-value");
//   expect(wordInput.value).toBe("");
//   expect(wordScore.textContent).toEqual("0");
//   fireEvent.change(wordInput, { target: { value: "szkrabble" } });
//   expect(wordInput.value).toBe("szkrabble");
//   expect(wordScore.textContent).toEqual("26");
// });

// it("correctly renders score of a word in different language", () => {
//   const app = render(<App />);
//   const wordInput = app.getByTestId("word-input");

//   fireEvent.change(wordInput, { target: { value: "szkrabble" } });
//   const wordScore = app.getByTestId("word-score-value");
//   const langSelect = app.getByTestId("lang-select");
//   fireEvent.change(langSelect, { target: { value: "pol" } });
//   expect(wordScore.textContent).toEqual("15");
// });
