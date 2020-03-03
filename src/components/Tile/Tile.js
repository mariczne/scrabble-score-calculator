import React from "react";
import "./Tile.css";

function Tile({
  index,
  character,
  score,
  isScoreDoubled,
  isScoreTripled,
  toggleLetterBonus
}) {
  return (
    <div
      className="tile"
      style={
        score === "?"
          ? { backgroundColor: "lightgray" }
          : isScoreDoubled
          ? { backgroundColor: "#6cf" }
          : isScoreTripled
          ? { backgroundColor: "#06f", color: "white" }
          : {}
      }
      onClick={() => toggleLetterBonus(index)}
    >
      <span className={`tile-letter ${(character.length > 1) ? "tile-letter--double" : ""}`}>{character.toUpperCase()}</span>
      <span className="tile-score">{character !== " " ? score : null}</span>
    </div>
  );
}

Tile.defaultProps = {
  score: "?"
};

export default Tile;
