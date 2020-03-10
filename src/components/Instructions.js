import React from "react";
import {
  BINGO_NAME,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO
} from "../modules/scoretable";

export default function Instructions() {
  return (
    <div>
      <p>Click on a tile to toggle its letter bonus</p>
      <p>All bonuses get reset when user input changes</p>
      <p>A blank tile can be entered by using the spacebar</p>
      {POINTS_FOR_BINGO ? (
        <p>
          {BINGO_NAME} can be activated when there are at least{" "}
          {MINIMUM_LETTERS_FOR_BINGO} tiles used
        </p>
      ) : null}
      <p>
        <a href="https://en.wikipedia.org/wiki/Scrabble#Scoring">
          Scrabble scoring rules
        </a>
      </p>
    </div>
  );
}
