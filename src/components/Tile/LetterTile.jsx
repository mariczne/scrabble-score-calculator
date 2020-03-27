import React from "react";
import PropTypes from "prop-types";

const LETTER_BONUS_STYLES = {
  2: { backgroundColor: "#6cf", color: "black" },
  3: { backgroundColor: "#09f", color: "black" }
};

const WORD_BONUS_STYLES = {
  2: { backgroundColor: "#f9f", color: "black" },
  3: { backgroundColor: "#f66", color: "black" }
};

export default function LetterTile({
  index,
  character,
  score,
  bonus,
  cycleLetterBonus
}) {
  const isScoreInvalid = Number.isNaN(score);

  const isBlankTile = character === " ";

  const isDigraph = character.length === 2;

  const isTrigraph = character.length === 3;

  function styleDiv() {
    if (isScoreInvalid) {
      return { backgroundColor: "lightgray", cursor: "default" };
    }
    switch (bonus.type) {
      case "tile": {
        return LETTER_BONUS_STYLES[bonus.multiplier];
      }
      case "word": {
        return WORD_BONUS_STYLES[bonus.multiplier];
      }
      default: {
        return { backgroundColor: "antiquewhite" };
      }
    }
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
      onKeyDown={e => (e.key === "Enter" ? cycleLetterBonus(index) : null)}
      tabIndex="0"
    >
      <span className={spanClassName}>{character.toUpperCase()}</span>
      <span className="tile__letter-score">{renderScore()}</span>
    </div>
  );
}

LetterTile.propTypes = {
  index: PropTypes.number,
  character: PropTypes.string,
  score: PropTypes.number,
  scoreMultiplier: PropTypes.number,
  cycleLetterBonus: PropTypes.func
};

LetterTile.defaultProps = {
  index: 0,
  character: " ",
  score: null,
  scoreMultiplier: 1,
  cycleLetterBonus: () => {}
};
