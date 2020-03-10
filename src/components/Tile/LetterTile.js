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
  isScoreInvalid,
  scoreMultiplier,
  cycleLetterBonus
}) {
  function styleDiv() {
    if (isScoreInvalid) {
      return LETTER_STYLE.invalid;
    }
    return LETTER_STYLE[scoreMultiplier];
  }

  function renderScore() {
    if (isBlankTile) {
      return null;
    }
    if (isScoreInvalid) {
      return "?";
    }
    return score;
  }

  const isBlankTile = character === " ";

  const isDigraph = character.length === 2;

  const isTrigraph = character.length === 3;

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={() => cycleLetterBonus(index)}
      tabIndex="0"
    >
      <span
        className={`tile__letter ${
          isDigraph ? "tile__letter--double" : null
        } ${
          isTrigraph ? "tile__letter--triple" : null
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
