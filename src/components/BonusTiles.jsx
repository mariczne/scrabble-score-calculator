import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { BonusTile, BingoTile } from "./Tile/Tile";
import {
  BINGO_NAME,
  POINTS_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS
} from "../constants/scoretable";
import { isNextBonusAllowed, isBingoAllowed } from "../modules/calculator";

const isGameUsingBingo = POINTS_FOR_BINGO > 0;

export default function BonusTiles() {
  const bonusTypes = Array.from(Object.keys(WORD_SCORE_MULTIPLIERS));
  const [state, dispatch] = useContext(WordContext);

  const handleWordBonus = (action, bonusType) => {
    dispatch({ type: action, payload: { bonusType } });
  };

  const toggleBingo = () => {
    dispatch({ type: "TOGGLE_BINGO" });
  };

  return (
    <div>
      {bonusTypes.map(bonusType => {
        return (
          <BonusTile
            key={bonusType}
            bonusType={bonusType}
            timesUsed={state.wordBonuses[bonusType]}
            isNextBonusAllowed={isNextBonusAllowed(state)}
            handleWordBonus={handleWordBonus}
          />
        );
      })}
      {isGameUsingBingo && (
        <BingoTile
          key={BINGO_NAME}
          bingoName={BINGO_NAME}
          handleBingo={toggleBingo}
          isBingoAllowed={isBingoAllowed(state)}
          isBingoUsed={state.isBingoUsed}
          textWhenBingoUsed="ACTIVE"
        />
      )}
    </div>
  );
}
