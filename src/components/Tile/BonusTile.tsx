import React from "react";

const BONUS_STYLE: any = {
  // TODO
  letter: {
    double: {
      backgroundColor: "#6cf",
    },
    triple: {
      backgroundColor: "#09f",
    },
  },
  word: {
    double: {
      backgroundColor: "#f9f",
    },
    triple: {
      backgroundColor: "#f66",
    },
  },
};

interface BonusTileProps {
  type: string;
  name: string;
}

export default function BonusTile({ type, name }: BonusTileProps) {
  return (
    <>
      <div className="tile tile--bonus" style={BONUS_STYLE[type][name]}>
        <span className="tile__bonus-name">
          {`${name.toUpperCase()} ${type.toUpperCase()} SCORE`}
        </span>
      </div>
    </>
  );
}

BonusTile.defaultProps = {
  type: "letter",
  name: "double",
};
