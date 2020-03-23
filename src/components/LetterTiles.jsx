import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { getTileScore, getTilesInWord } from "../modules/calculator";
import { LetterTile } from "./Tile/Tile";

export default function LetterTiles() {
  const {
    wordReducer: [state, dispatch]
  } = useContext(WordContext);
  const tiles = getTilesInWord(state.input, { languageCode: state.language });

  const cycleTileBonus = tileId => {
    dispatch({ type: "CYCLE_TILE_BONUS", payload: { tileId } });
  };
  
  return (
    <div>
      {tiles.map((tile, index) => (
        <LetterTile
          key={index}
          index={index}
          character={tile}
          score={getTileScore(tile, {
            languageCode: state.language,
            scoreMultiplier: state.tileBonuses[index]
          })}
          scoreMultiplier={state.tileBonuses[index]}
          cycleLetterBonus={cycleTileBonus}
        />
      ))}
    </div>
  );
}
