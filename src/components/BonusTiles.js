import React from "react";
import PropTypes from "prop-types";
import { BonusTile, BingoTile } from "./Tile/Tile";
import { BINGO_NAME, WORD_SCORE_MULTIPLIERS } from "../modules/scoretable";

export default function BonusTiles({
  addBonus,
  removeBonus,
  bonusesUsed,
  isNextBonusAllowed,
  isGameUsingBingo,
  handleBingo,
  isBingoAllowed,
  isBingoUsed
}) {
  function renderBonusTiles() {
    const tiles = [];
    for (const bonusType in WORD_SCORE_MULTIPLIERS) {
      tiles.push(
        <BonusTile
          key={bonusType}
          bonusType={bonusType}
          timesUsed={bonusesUsed[bonusType]}
          addBonus={addBonus}
          removeBonus={removeBonus}
          isNextBonusAllowed={isNextBonusAllowed}
        />
      );
    }
    return tiles;
  }

  function renderBingoTile() {
    if (isGameUsingBingo) {
      return (
        <BingoTile
          key={BINGO_NAME}
          bingoName={BINGO_NAME}
          handleBingo={handleBingo}
          isBingoAllowed={isBingoAllowed}
          isBingoUsed={isBingoUsed}
        />
      );
    }
  }

  return (
    <div>
      {renderBonusTiles()}
      {renderBingoTile()}
    </div>
  );
}

BonusTiles.propTypes = {
  addBonus: PropTypes.func,
  removeBonus: PropTypes.func,
  bonusesUsed: PropTypes.object,
  isNextBonusAllowed: PropTypes.bool,
  isGameUsingBingo: PropTypes.bool,
  handleBingo: PropTypes.func,
  isBingoAllowed: PropTypes.bool,
  isBingoUsed: PropTypes.bool
};

BonusTiles.defaultProps = {
  addBonus: () => {},
  removeBonus: () => {},
  bonusesUsed: {},
  isNextBonusAllowed: true,
  isGameUsingBingo: true,
  handleBingo: () => {},
  isBingoAllowed: false,
  isBingoUsed: false
};
