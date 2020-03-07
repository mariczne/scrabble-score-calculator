import React from "react";
import "./Tile.css";

function LetterTile({
  index,
  character,
  score,
  scoreMultiplier,
  cycleLetterBonus
}) {
  function styleDiv() {
    const style = {};
    if (isInvalidLetter()) style.backgroundColor = "lightgray";
    else if (scoreMultiplier === 2) style.backgroundColor = "#6cf";
    else if (scoreMultiplier === 3) {
      style.backgroundColor = "#06f";
      style.color = "white";
    }
    return style;
  }

  function isInvalidLetter() {
    return Number.isNaN(score);
  }

  function renderScore() {
    if (isBlankTile()) return null;
    if (isInvalidLetter()) return "?";
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

export default LetterTile;
