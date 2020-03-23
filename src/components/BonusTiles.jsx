import React, { useContext } from "react";
import { WordContext } from "../context/word";
import {
  isNextBonusAllowed,
  isBingoAllowed,
  getWordBonusTypes
} from "../modules/calculator";
import { BonusTile, BingoTile } from "./Tile/Tile";

export default function BonusTiles() {
  const bonusTypes = getWordBonusTypes();
  const {
    wordReducer: [state, dispatch],
    SETTINGS: { POINTS_FOR_BINGO },
    BINGO_NAME
  } = useContext(WordContext);

  const isGameUsingBingo = POINTS_FOR_BINGO > 0;

  const handleWordBonus = (action, bonusType) => {
    dispatch({ type: action, payload: { bonusType } });
  };

  const toggleBingo = () => {
    dispatch({ type: "TOGGLE_BINGO" });
  };

  return (
    <>
      {bonusTypes.map(bonusType => {
        return (
          <BonusTile
            key={bonusType}
            bonusType={bonusType}
            timesUsed={
              state.wordBonuses.find(bonus => bonus.type === bonusType)?.times
            }
            isNextBonusAllowed={isNextBonusAllowed(state.input, {
              languageCode: state.language,
              wordBonuses: state.wordBonuses,
              tileBonuses: state.tileBonuses
            })}
            handleWordBonus={handleWordBonus}
          />
        );
      })}
      {isGameUsingBingo && (
        <BingoTile
          key={BINGO_NAME}
          bingoName={BINGO_NAME}
          handleBingo={toggleBingo}
          isBingoAllowed={isBingoAllowed(state.input, {
            languageCode: state.language
          })}
          isBingoUsed={state.isBingoUsed}
          textWhenBingoUsed="ACTIVE"
        />
      )}
    </>
  );
}
