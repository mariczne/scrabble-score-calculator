import React from 'react'
import { LetterTile } from "./Tile/Tile";

export default function LetterTiles({letters, cycleLetterBonus}) {
  function renderLetterTiles() {
    return letters.map(({ character, score, scoreMultiplier }, index) => (
      <LetterTile
        key={index}
        index={index}
        character={character}
        score={score}
        scoreMultiplier={scoreMultiplier}
        cycleLetterBonus={cycleLetterBonus}
      />
    ));
  };

  return (
    <div>
      {renderLetterTiles()}
    </div>
  )
}
