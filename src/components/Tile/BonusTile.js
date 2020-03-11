import React from "react";
import PropTypes from "prop-types";

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
  addBonus,
  removeBonus,
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

  function renderBonusRemoveButton() {
    if (timesUsed > 0) {
      return (
        <button
          className="tile__bonus-remove"
          onClick={() => removeBonus(bonusType)}
        >
          –
        </button>
      );
    }
    return null;
  }

  return (
    <>
      {renderBonusRemoveButton()}
      <div
        className="tile"
        style={styleDiv()}
        onClick={() => addBonus(bonusType)}
        tabIndex="0"
      >
        <span className="tile__bonus-name">{renderBonusName()}</span>
        {renderBonusState()}
      </div>
    </>
  );
}

BonusTile.propTypes = {
  bonusType: PropTypes.string,
  timesUsed: PropTypes.number,
  addBonus: PropTypes.func,
  removeBonus: PropTypes.func,
  isNextBonusAllowed: PropTypes.bool
};

BonusTile.defaultProps = {
  bonusType: "double",
  timesUsed: 0,
  addBonus: () => {},
  removeBonus: () => {},
  isNextBonusAllowed: true
};
