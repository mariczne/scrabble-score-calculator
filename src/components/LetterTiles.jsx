import React from "react";
import PropTypes from "prop-types";
import { LetterTile } from "./Tile/Tile";

export default function LetterTiles({ letters, cycleLetterBonus }) {
  return (
    <div>
      {letters.map(
        (
          { character, getScore, getScoreMultiplier, hasInvalidScore },
          index
        ) => (
          <LetterTile
            key={index}
            index={index}
            character={character}
            score={getScore()}
            isScoreInvalid={hasInvalidScore()}
            scoreMultiplier={getScoreMultiplier()}
            cycleLetterBonus={cycleLetterBonus}
          />
        )
      )}
    </div>
  );
}

LetterTiles.propTypes = {
  letters: PropTypes.array,
  cycleLetterBonus: PropTypes.func
};

LetterTiles.defaultProps = {
  letters: [],
  cycleLetterBonus: () => {}
};
