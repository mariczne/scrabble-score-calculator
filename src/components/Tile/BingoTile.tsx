import React from "react";

const BINGO_STYLE: any = {
  // TODO
  allowed: { backgroundColor: "orange" },
  notAllowed: { backgroundColor: "lightgray", cursor: "default" },
};

interface BingoTileProps {
  bingoName: string;
  toggleBingo: () => void;
  isBingoAllowed: boolean;
  isBingoUsed: boolean;
  textWhenBingoUsed: string;
}

export default function BingoTile({
  bingoName,
  toggleBingo,
  isBingoAllowed,
  isBingoUsed,
  textWhenBingoUsed,
}: BingoTileProps) {
  function styleDiv() {
    return isBingoAllowed ? BINGO_STYLE.allowed : BINGO_STYLE.notAllowed;
  }

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={toggleBingo}
      onKeyDown={(e) => (e.key === "Enter" ? toggleBingo() : null)}
      tabIndex={0}
    >
      <span className="tile__bonus-name">{bingoName.toUpperCase()}</span>
      {isBingoUsed && (
        <span className="tile__bonus-state">{textWhenBingoUsed}</span>
      )}
    </div>
  );
}

BingoTile.defaultProps = {
  bingoName: "Bingo",
  toggleBingo: () => {},
  isBingoAllowed: false,
  isBingoUsed: false,
  textWhenBingoUsed: "ACTIVE",
};
