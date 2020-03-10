import React from "react";
import { BonusTile, BingoTile } from "./Tile/Tile";
import {
  POINTS_FOR_BINGO,
  BINGO_NAME,
  WORD_SCORE_MULTIPLIERS
} from "../modules/scoretable";

export default function BonusTiles({ word, handleBonus, handleBingo }) {
  function renderBonusTiles() {
    const tiles = [];
    for (const bonusType in WORD_SCORE_MULTIPLIERS) {
      tiles.push(
        <BonusTile
          key={bonusType}
          bonusType={bonusType}
          timesUsed={word.bonusesUsed[bonusType]}
          handleBonus={handleBonus}
          isNextBonusAllowed={word.isNextBonusAllowed()}
        />
      );
    }
    return tiles;
  }

  function renderBingoTile() {
    if (POINTS_FOR_BINGO) {
      return (
        <BingoTile
          key={BINGO_NAME}
          bingoName={BINGO_NAME}
          handleBingo={handleBingo}
          isBingoAllowed={word.isBingoAllowed()}
          isBingoUsed={word.isBingoUsed}
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
