import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { getTileScore, getTilesInWord } from "../modules/calculator";
import { cycleTileBonus } from "../actions/word";
import { LetterTile } from "./Tile/Tile";

export default function LetterTiles() {
  const {
    wordReducer: [state, dispatch]
  } = useContext(WordContext);
  const tiles = getTilesInWord(state.input, { languageCode: state.language });

  function getTileScoreMultiplier(index) {
    return (
      state.bonuses.find(tile => tile.index === index && tile.type === "tile")
        ?.multiplier ?? 1
    );
  }

  function getTileBonus(index) {
    const bonus = state.bonuses.find(tile => tile.index === index);
    if (bonus) {
      return { type: bonus.type, multiplier: bonus.multiplier };
    }
    return { type: "none", multiplier: 1 };
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
            multiplier: getTileScoreMultiplier(index)
          })}
          bonus={getTileBonus(index)}
          cycleLetterBonus={() => dispatch(cycleTileBonus(state, index))}
        />
      ))}
    </div>
  );
}
