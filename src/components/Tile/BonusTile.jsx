import React from "react";
import PropTypes from "prop-types";

const BONUS_STYLE = {
  letter: {
    double: {
      backgroundColor: "#6cf",
      cursor: "default"
    },
    triple: {
      backgroundColor: "#06f",
      cursor: "default"
    }
  },
  word: {
    double: {
      backgroundColor: "#f9f",
      cursor: "default"
    },
    triple: {
      backgroundColor: "#f00",
      cursor: "default"
    }
  }
};

export default function BonusTile({ type, name }) {
  return (
    <>
      <div className="tile" style={BONUS_STYLE[type][name]} tabIndex="0">
        <span className="tile__bonus-name">{`${name.toUpperCase()} ${type.toUpperCase()} SCORE`}</span>
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
      <button className="tile__bonus-remove" onClick={removeWordBonus}>
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
