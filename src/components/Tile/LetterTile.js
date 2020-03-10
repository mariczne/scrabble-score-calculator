import React from "react";

const LETTER_STYLE = {
  invalid: { backgroundColor: "lightgray", cursor: "default" },
  1: { backgroundColor: "antiquewhite" },
  2: { backgroundColor: "#6cf" },
  3: { backgroundColor: "#06f", color: "white" }
};

export default function LetterTile({
  index,
  character,
  score,
  scoreMultiplier,
  cycleLetterBonus
}) {
  function styleDiv() {
    if (isInvalidLetter()) {
      return LETTER_STYLE.invalid;
    }
    return LETTER_STYLE[scoreMultiplier];
  }

  function isInvalidLetter() {
    return Number.isNaN(score);
  }

  function renderScore() {
    if (isBlankTile()) {
      return null;
    }
    if (isInvalidLetter()) {
      return "?";
    }
    return score;
  }

  function isBlankTile() {
    return character === " ";
  }

  function isDigraph() {
    return character.length === 2;
  }

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={() => cycleLetterBonus(index)}
    >
      <span
        className={`tile__letter ${
          isDigraph() ? "tile__letter--double" : null
        }`}
      >
        {character.toUpperCase()}
      </span>
      <span className="tile__letter-score">{renderScore()}</span>
    </div>
  );
}

LetterTile.defaultProps = {
  character: " ",
  score: "?",
  scoreMultiplier: 1
};
