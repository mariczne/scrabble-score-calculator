import React from "react";

const BINGO_STYLE = {
  allowed: { backgroundColor: "orange" },
  notAllowed: { backgroundColor: "lightgray", cursor: "default" }
};

const TEXT_WHEN_USED = "ACTIVE";

export default function BingoTile({
  bingoName,
  handleBingo,
  isBingoAllowed,
  isBingoUsed
}) {
  function styleDiv() {
    const { allowed, notAllowed } = BINGO_STYLE;
    if (isBingoAllowed) {
      return allowed;
    }
    return notAllowed;
  }

  function renderBingoState() {
    if (isBingoUsed) {
      return <span className="tile__bonus-state">{TEXT_WHEN_USED}</span>;
    }
    return null;
  }

  return (
    <div className="tile" style={styleDiv()} onClick={handleBingo}>
      <span className="tile__bonus-name">{bingoName.toUpperCase()}</span>
      {renderBingoState()}
    </div>
  );
}
