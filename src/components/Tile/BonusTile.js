import React from "react";
import "./Tile.css";

const BONUS_STYLE = {
  notAllowed: {
    backgroundColor: "lightgray",
    cursor: "default"
  },
  double: {
    backgroundColor: "#f9f"
  },
  triple: {
    backgroundColor: "#f00"
  }
};

export default function BonusTile({
  bonusType,
  timesUsed,
  handleBonus,
  isNextBonusAllowed
}) {
  function styleDiv() {
    if (!isNextBonusAllowed) {
      return BONUS_STYLE.notAllowed;
    }
    return BONUS_STYLE[bonusType];
  }

  function renderBonusName() {
    return `${bonusType.toUpperCase()} WORD SCORE`;
  }

  function renderBonusState() {
    if (timesUsed > 0) {
      return <span className="tile__bonus-state">x{timesUsed}</span>;
    }
    return null;
  }

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={() => handleBonus(bonusType)}
    >
      <span className="tile__bonus-name">{renderBonusName()}</span>
      {renderBonusState()}
    </div>
  );
}
