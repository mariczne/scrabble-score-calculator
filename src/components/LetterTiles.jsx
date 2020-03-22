import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { LetterTile } from "./Tile/Tile";
import { Calculator, getTilesInWord } from "../modules/calculator";

export default function LetterTiles() {
  const [state, dispatch] = useContext(WordContext);
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
          score={Calculator.getTileScore(tile, {
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
