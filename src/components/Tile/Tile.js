import React from "react";
import "./Tile.css";

function Tile(props) {
  const { letter, score } = props;

  return (
    <div
      className="tile"
      style={score === "?" ? { backgroundColor: "lightgray" } : {}}
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
