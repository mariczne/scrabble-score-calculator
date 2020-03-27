import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { isBingoAllowed, getWordBonusTypes } from "../modules/calculator";
import { toggleBingo } from "../actions/word";
import { BonusTile, BingoTile } from "./Tile/Tile";

export default function BonusTiles() {
  const wordBonusTypes = getWordBonusTypes().map(bonus => ({
    name: bonus,
    type: "word"
  }));
  const letterBonusTypes = [
    { name: "double", type: "letter" },
    { name: "triple", type: "letter" }
  ];
  const {
    wordReducer: [state, dispatch],
    SETTINGS: { POINTS_FOR_BINGO },
    BINGO_NAME
  } = useContext(WordContext);

  const isGameUsingBingo = POINTS_FOR_BINGO > 0;

  return (
    <>
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
      {letterBonusTypes.map(bonus => {
        return (
          <BonusTile
            key={`letter_${bonus.name}`}
            type={bonus.type}
            name={bonus.name}
          />
        );
      })}
      {wordBonusTypes.map(bonus => {
        return (
          <BonusTile
            key={`word_${bonus.name}`}
            type={bonus.type}
            name={bonus.name}
          />
        );
      })}
    </>
  );
}
