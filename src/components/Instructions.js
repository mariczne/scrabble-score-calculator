import React from "react";
import {
  BINGO_NAME,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO
} from "../modules/scoretable";

const isGameUsingBingo = POINTS_FOR_BINGO > 0;

export default function Instructions() {
  return (
    <div>
      <p>Click on a tile to toggle its letter bonus</p>
      <p>A blank tile can be entered by using the spacebar</p>
      <p>All bonuses get reset when user input or language changes</p>
      {isGameUsingBingo && (
        <p>
          {BINGO_NAME} can be activated when there are at least{" "}
          {MINIMUM_LETTERS_FOR_BINGO} tiles used
        </p>
      )}
      <p>
        There cannot ever be more word + letter bonuses than letters in a word
      </p>
      <p>
        <a href="https://en.wikipedia.org/wiki/Scrabble#Scoring">
          Scrabble scoring rules
        </a>
      </p>
    </div>
  );
}
