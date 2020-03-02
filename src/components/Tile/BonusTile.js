import React from "react";
import "./Tile.css";

function BonusTile({ type, times, toggleWordBonus, bingoAllowed, bingoUsed }) {
  return (
    <div
      className="tile"
      style={
        type === "double"
          ? { backgroundColor: "#f9f" }
          : type === "triple"
          ? { backgroundColor: "#f00" }
          : type === "bingo" && bingoAllowed
          ? { backgroundColor: "orange" }
          : { backgroundColor: "lightgray", cursor: "default" }
      }
      onClick={() => toggleWordBonus(type)}
    >
      <span className="tile-bonus-name">
        {type === "double"
          ? "DOUBLE WORD SCORE"
          : type === "triple"
          ? "TRIPLE WORD SCORE"
          : type === "bingo"
          ? "BINGO"
          : null }
      </span>
      {type === "bingo" ? (
        bingoUsed ? (
          <span className="tile-bonus-score" style={{ left: "-0.75rem" }}>
            ACTIVE
          </span>
        ) : null
      ) : (
        <span className="tile-bonus-score">x{times}</span>
      )}
    </div>
  );
}

export default BonusTile;
