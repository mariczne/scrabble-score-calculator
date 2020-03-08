import React from "react";
import "./Tile.css";

function BonusTile({
  bonusType,
  timesUsed,
  handleWordBonus,
  isNextWordBonusAllowed,
  isBingoAllowed,
  isBingoUsed
}) {
  function styleDiv() {
    const style = {};
    if (!isNextWordBonusAllowed && bonusType !== "bingo") {
      style.backgroundColor = "lightgray";
      style.cursor = "default";
    } else {
      switch (bonusType) {
        case "double":
          style.backgroundColor = "#f9f";
          break;
        case "triple":
          style.backgroundColor = "#f00";
          break;
        case "bingo":
          if (isBingoAllowed) {
            style.backgroundColor = "orange";
          } else {
            style.backgroundColor = "lightgray";
            style.cursor = "default";
          }
          break;
        default:
      }
    }
    return style;
  }

  function renderBonusName() {
    switch (bonusType) {
      case "double":
        return "DOUBLE WORD SCORE";
      case "triple":
        return "TRIPLE WORD SCORE";
      case "bingo":
        return "BINGO";
      default:
        return null;
    }
  }

  function renderBonusState() {
    if (bonusType === "bingo" && isBingoUsed) {
      return <span className="tile__bonus-state">ACTIVE</span>;
    }
    if (timesUsed > 0) {
      return <span className="tile__bonus-state">x{timesUsed}</span>;
    }
    return null;
  }

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={() => handleWordBonus(bonusType)}
    >
      <span className="tile__bonus-name">{renderBonusName()}</span>
      {renderBonusState()}
    </div>
  );
}

export default BonusTile;
