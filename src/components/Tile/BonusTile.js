import React from "react";
import "./Tile.css";

function BonusTile({
  bonusType,
  times,
  toggleWordBonus,
  isBingoAllowed,
  isBingoUsed
}) {
  return (
    <div
      className="tile"
      style={
        bonusType === "double"
          ? { backgroundColor: "#f9f" }
          : bonusType === "triple"
          ? { backgroundColor: "#f00" }
          : bonusType === "bingo" && isBingoAllowed
          ? { backgroundColor: "orange" }
          : { backgroundColor: "lightgray", cursor: "default" }
      }
      onClick={() => toggleWordBonus(bonusType)}
    >
      <span className="tile-bonus-name">
        {bonusType === "double"
          ? "DOUBLE WORD SCORE"
          : bonusType === "triple"
          ? "TRIPLE WORD SCORE"
          : bonusType === "bingo"
          ? "BINGO"
          : null}
      </span>
      {bonusType === "bingo" ? (
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
