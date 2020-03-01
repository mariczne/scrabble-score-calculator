import React from "react";
import "./Tile.css";

function Tile({
  id,
  letter,
  score,
  doubleScore,
  tripleScore,
  toggleLetterBonus
}) {
  return (
    <div
      className="tile"
      style={
        score === "?"
          ? { backgroundColor: "lightgray" }
          : doubleScore
          ? { backgroundColor: "#6cf" }
          : tripleScore
          ? { backgroundColor: "#06f" }
          : {}
      }
      onClick={() => toggleLetterBonus(id)}
    >
      <span className="tile-letter">{letter.toUpperCase()}</span>
      <span className="tile-score">{letter !== " " ? score : null}</span>
    </div>
  );
}

Tile.defaultProps = {
  score: "?"
};

export default Tile;
