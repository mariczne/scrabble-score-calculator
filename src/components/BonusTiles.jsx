import React, { useContext } from "react";
import { WordContext } from "../context/word";
import {
  isNextBonusAllowed,
  isBingoAllowed,
  getWordBonusTypes
} from "../modules/calculator";
import { addWordBonus, removeWordBonus, toggleBingo } from "../actions/word";
import { BonusTile, BingoTile } from "./Tile/Tile";

export default function BonusTiles() {
  const bonusTypes = getWordBonusTypes();
  const {
    wordReducer: [state, dispatch],
    SETTINGS: { POINTS_FOR_BINGO },
    BINGO_NAME
  } = useContext(WordContext);

  const isGameUsingBingo = POINTS_FOR_BINGO > 0;

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
            addWordBonus={() => dispatch(addWordBonus(state, bonusType))}
            removeWordBonus={() => dispatch(removeWordBonus(state, bonusType))}
          />
        );
      })}
      {isGameUsingBingo && (
        <BingoTile
          key={BINGO_NAME}
          bingoName={BINGO_NAME}
          toggleBingo={() => dispatch(toggleBingo(state))}
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
