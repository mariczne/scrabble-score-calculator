import React from "react";
import { BonusType, Bonus } from "../../modules/calculator/interfaces";

const LETTER_BONUS_STYLES: any = {
  // TODO
  2: { backgroundColor: "#6cf" },
  3: { backgroundColor: "#09f" },
};

const WORD_BONUS_STYLES: any = {
  // TODO
  2: { backgroundColor: "#f9f" },
  3: { backgroundColor: "#f66" },
};

interface LetterTileProps {
  index: number;
  character: string;
  score: number;
  bonus: Bonus;
  cycleLetterBonus: Function;
}

export default function LetterTile({
  index = 0,
  character = " ",
  score = 0,
  bonus,
  cycleLetterBonus,
}: LetterTileProps) {
  const isScoreInvalid = Number.isNaN(score);
  const isBlankTile = character === " ";
  const isDigraph = character.length === 2;
  const isTrigraph = character.length === 3;

  function styleDiv() {
    if (isScoreInvalid) {
      return { backgroundColor: "lightgray", cursor: "default" };
    }
    switch (bonus.type) {
      case BonusType.Tile: {
        return LETTER_BONUS_STYLES[bonus.multiplier];
      }
      case BonusType.Word: {
        return WORD_BONUS_STYLES[bonus.multiplier];
      }
      default: {
        return { backgroundColor: "antiquewhite", color: "green" };
      }
    }
  }

  function renderScore() {
    if (isBlankTile) {
      return null;
    }
    if (isScoreInvalid) {
      return "?";
    }
    return score;
  }

  const charSpanClassName = `tile__letter
    ${isDigraph ? " tile__letter--double" : ""}
    ${isTrigraph ? " tile__letter--triple" : ""}`;

  return (
    <div
      className="tile"
      style={styleDiv()}
      onClick={() => cycleLetterBonus(index)}
      onKeyDown={(e) => (e.key === "Enter" ? cycleLetterBonus(index) : null)}
      tabIndex={0}
    >
      <span className={charSpanClassName}>{character.toUpperCase()}</span>
      <span className="tile__letter-score">{renderScore()}</span>
    </div>
  );
}
