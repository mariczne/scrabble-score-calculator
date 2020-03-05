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
      <span
        className={`tile__letter ${
          character.length > 1 ? "tile__letter--double" : null
        }`}
      >
        {character.toUpperCase()}
      </span>
      <span className="tile__score">{character !== " " ? score : null}</span>
    </div>
  );
}

Tile.defaultProps = {
  score: "?"
};

export default Tile;
