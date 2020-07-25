import React, { useContext } from "react";
import { WordContext } from "../context/wordContext";
import { getTileScore, getTilesInWord } from "../modules/calculator";
import { cycleTileBonus } from "../actions/wordActions";
import { LetterTile } from "./Tile/Tile";
import { BonusType, Bonus } from "../modules/calculator/interfaces";

export default function LetterTiles() {
  const {
    wordReducer: [state, dispatch],
  } = useContext(WordContext);
  const tiles = getTilesInWord(state.input, { languageCode: state.language });

  function getTileScoreMultiplier(index: number) {
    return (
      state.bonuses.find(
        (bonus: Bonus) => bonus.index === index && bonus.type === BonusType.Tile
      )?.multiplier ?? 1
    );
  }

  function getTileBonus(index: number) {
    const bonus = state.bonuses.find((bonus: Bonus) => bonus.index === index);
    if (bonus) return bonus;
    return { index, type: "none", multiplier: 1 };
  }

  return (
    <div>
      {tiles.map((tile, index) => (
        <LetterTile
          key={index}
          index={index}
          character={tile}
          score={getTileScore(tile, {
            languageCode: state.language,
            multiplier: getTileScoreMultiplier(index),
          })}
          bonus={getTileBonus(index)}
          cycleLetterBonus={() => dispatch(cycleTileBonus(state, index))}
        />
      ))}
    </div>
  );
}
