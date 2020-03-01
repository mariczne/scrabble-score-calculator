import React from "react";
import "./Tile.css";

function BonusTile({ type, times, toggleWordBonus }) {
  return (
    <div
      className="tile"
      style={
        type === "double"
          ? { backgroundColor: "#f9f" }
          : type === "triple"
          ? { backgroundColor: "#f00" }
          : {}
      }
      onClick={() => toggleWordBonus(type)}
    >
      <span className="tile-bonus-name">
        {type === "double"
          ? "DOUBLE WORD SCORE"
          : type === "triple"
          ? "TRIPLE WORD SCORE"
          : ""}
      </span>
      <span className="tile-bonus-score">x{times}</span>
    </div>
  );
}

export default BonusTile;
