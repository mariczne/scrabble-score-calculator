import React from "react";
// import PropTypes from "prop-types";

const LETTER_STYLE = {
  invalidScore: { backgroundColor: "lightgray", cursor: "default" },
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
  const isScoreInvalid = Number.isNaN(score);

  const isBlankTile = character === " ";

  const isDigraph = character.length === 2;

  const isTrigraph = character.length === 3;

  function styleDiv() {
    if (isScoreInvalid) {
      return LETTER_STYLE.invalidScore;
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

  const spanClassName = `tile__letter ${
    isDigraph ? "tile__letter--double" : null
  } ${isTrigraph ? "tile__letter--triple" : null}`;

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={() => cycleLetterBonus(index)}
      tabIndex="0"
    >
      <span className={spanClassName}>{character.toUpperCase()}</span>
      <span className="tile__letter-score">{renderScore()}</span>
    </div>
  );
}

// LetterTile.propTypes = {
//   index: PropTypes.number,
//   character: PropTypes.string,
//   score: PropTypes.number,
//   isScoreInvalid: PropTypes.bool,
//   scoreMultiplier: PropTypes.number,
//   cycleLetterBonus: PropTypes.func
// };

// LetterTile.defaultProps = {
//   index: 0,
//   character: " ",
//   score: null,
//   isScoreInvalid: false,
//   scoreMultiplier: 1,
//   cycleLetterBonus: () => {}
// };
