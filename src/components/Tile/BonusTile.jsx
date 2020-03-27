import React from "react";
import PropTypes from "prop-types";

const BONUS_STYLE = {
  letter: {
    double: {
      backgroundColor: "#6cf"
    },
    triple: {
      backgroundColor: "#09f"
    }
  },
  word: {
    double: {
      backgroundColor: "#f9f"
    },
    triple: {
      backgroundColor: "#f66"
    }
  }
};

export default function BonusTile({ type, name }) {
  return (
    <>
      <div
        className="tile tile--bonus"
        style={BONUS_STYLE[type][name]}
      >
        <span className="tile__bonus-name">
          {`${name.toUpperCase()} ${type.toUpperCase()} SCORE`}
        </span>
      </div>
    </>
  );
}

BonusTile.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string
};

BonusTile.defaultProps = {
  type: "letter",
  name: "double"
};
