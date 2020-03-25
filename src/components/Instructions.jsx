import React, { useContext } from "react";
import { WordContext } from "../context/word";
import BonusTiles from "./BonusTiles";

export default function Instructions() {
  const {
    SETTINGS: { POINTS_FOR_BINGO, MINIMUM_LETTERS_FOR_BINGO },
    BINGO_NAME
  } = useContext(WordContext);
  const isGameUsingBingo = POINTS_FOR_BINGO > 0;

  return (
    <>
      <p>Possible bonuses:</p>
      <BonusTiles />
      <p>Click on a tile to cycle its bonus</p>
      <p>A blank tile can be entered by using the spacebar</p>
      {isGameUsingBingo && (
        <p>
          {BINGO_NAME} can be activated when there are at least{" "}
          {MINIMUM_LETTERS_FOR_BINGO} tiles used
        </p>
      )}
      <p>There cannot be more word + letter bonuses than letters in a word</p>
      <p>
        <a href="https://en.wikipedia.org/wiki/Scrabble#Scoring">
          Scrabble scoring rules
        </a>
      </p>
    </>
  );
}
