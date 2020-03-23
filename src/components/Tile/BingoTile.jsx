import React from "react";
import PropTypes from "prop-types";

const BINGO_STYLE = {
  allowed: { backgroundColor: "orange" },
  notAllowed: { backgroundColor: "lightgray", cursor: "default" }
};

export default function BingoTile({
  bingoName,
  toggleBingo,
  isBingoAllowed,
  isBingoUsed,
  textWhenBingoUsed
}) {
  function styleDiv() {
    const { allowed, notAllowed } = BINGO_STYLE;
    if (isBingoAllowed) {
      return allowed;
    }
    return notAllowed;
  }

  return (
    <div className="tile" style={styleDiv()} onClick={toggleBingo} tabIndex="0">
      <span className="tile__bonus-name">{bingoName.toUpperCase()}</span>
      {isBingoUsed && (
        <span className="tile__bonus-state">{textWhenBingoUsed}</span>
      )}
    </div>
  );
}

BingoTile.propTypes = {
  bingoName: PropTypes.string,
  toggleBingo: PropTypes.func,
  isBingoAllowed: PropTypes.bool,
  isBingoUsed: PropTypes.bool,
  textWhenBingoUsed: PropTypes.string
};

BingoTile.defaultProps = {
  bingoName: "Bingo",
  toggleBingo: () => {},
  isBingoAllowed: false,
  isBingoUsed: false,
  textWhenBingoUsed: "ACTIVE"
};
