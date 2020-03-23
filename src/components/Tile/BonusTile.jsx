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
  addWordBonus,
  removeWordBonus,
  isNextBonusAllowed
}) {
  function styleDiv() {
    if (!isNextBonusAllowed) {
      return BONUS_STYLE.notAllowed;
    }
    return BONUS_STYLE[bonusType];
  }

  const bonusName = `${bonusType.toUpperCase()} WORD SCORE`;

  return (
    <>
      <BonusRemoveButton
        bonusType={bonusType}
        timesUsed={timesUsed}
        removeWordBonus={removeWordBonus}
      />
      <div
        className="tile"
        style={styleDiv()}
        onClick={addWordBonus}
        tabIndex="0"
      >
        <span className="tile__bonus-name">{bonusName}</span>
        <BonusState timesUsed={timesUsed} />
      </div>
    </>
  );
}

BonusTile.propTypes = {
  bonusType: PropTypes.string,
  timesUsed: PropTypes.number,
  addWordBonus: PropTypes.func,
  removeWordBonus: PropTypes.func,
  isNextBonusAllowed: PropTypes.bool
};

BonusTile.defaultProps = {
  bonusType: "double",
  timesUsed: 0,
  addWordBonus: PropTypes.func,
  removeWordBonus: () => {},
  isNextBonusAllowed: true
};

function BonusRemoveButton({ bonusType, timesUsed, removeWordBonus }) {
  if (timesUsed > 0) {
    return (
      <button
        className="tile__bonus-remove"
        onClick={removeWordBonus}
      >
        –
      </button>
    );
  }
  return null;
}

BonusRemoveButton.propTypes = {
  bonusType: PropTypes.string,
  timesUsed: PropTypes.number,
  removeWordBonus: PropTypes.func
};

BonusRemoveButton.defaultProps = {
  bonusType: "double",
  timesUsed: 0,
  removeWordBonus: () => {}
};

function BonusState({ timesUsed }) {
  if (timesUsed > 0) {
    return <span className="tile__bonus-state">x{timesUsed}</span>;
  }
  return null;
}

BonusState.propTypes = {
  timesUsed: PropTypes.number
};

BonusState.defaultProps = {
  timesUsed: 0
};
