import React from "react";
import "./Tile.css";

function BonusTile({
  bonusType,
  timesUsed,
  handleWordBonus,
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
      onClick={() => handleWordBonus(bonusType)}
    >
      <span className="tile__bonus-name">
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
          <span className="tile__bonus-score">
            ACTIVE
          </span>
        ) : null
      ) : timesUsed > 0 ? (
        <span className="tile__bonus-score">x{timesUsed}</span>
      ) : null}
    </div>
  );
}

export default BonusTile;
