import React from "react";
import PropTypes from "prop-types";
import { LetterTile } from "./Tile/Tile";

export default function LetterTiles({ letters, cycleLetterBonus }) {
  function renderLetterTiles() {
    return letters.map(
      ({ character, score, scoreMultiplier, hasInvalidScore }, index) => (
        <LetterTile
          key={index}
          index={index}
          character={character}
          score={score}
          isScoreInvalid={hasInvalidScore()}
          scoreMultiplier={scoreMultiplier}
          cycleLetterBonus={cycleLetterBonus}
        />
      )
    );
  }

  return <div>{renderLetterTiles()}</div>;
}

LetterTiles.propTypes = {
  letters: PropTypes.array,
  cycleLetterBonus: PropTypes.func
};

LetterTiles.defaultProps = {
  letters: [],
  cycleLetterBonus: () => {}
};
