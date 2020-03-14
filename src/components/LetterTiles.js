import React from "react";
import PropTypes from "prop-types";
import { LetterTile } from "./Tile/Tile";

export default function LetterTiles({ letters, cycleLetterBonus }) {
  function renderLetterTiles() {
    return letters.map(
      ({ character, getScore, getScoreMultiplier, hasInvalidScore }, index) => (
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
