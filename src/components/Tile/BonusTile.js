import React from "react";
import "./Tile.css";

function BonusTile({
  type,
  times,
  toggleWordBonus,
  isBingoAllowed,
  isBingoUsed
}) {
  return (
    <div
      className="tile"
      style={
        type === "double"
          ? { backgroundColor: "#f9f" }
          : type === "triple"
          ? { backgroundColor: "#f00" }
          : type === "bingo" && isBingoAllowed
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
          : null}
      </span>
      {type === "bingo" ? (
        isBingoUsed ? (
          <span className="tile-bonus-score" style={{ left: "-0.75rem" }}>
            ACTIVE
          </span>
        ) : null
      ) : times > 0 ? (
        <span className="tile-bonus-score">x{times}</span>
      ) : null}
    </div>
  );
}

export default BonusTile;
