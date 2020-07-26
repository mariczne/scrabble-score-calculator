import React from "react";
import { BonusType, Bonus } from "../../modules/calculator/interfaces";
import Tile from "./Tile";
import styled, { css } from "styled-components";

interface IStyledLetterTile {
  isScoreInvalid: boolean;
  bonusType: BonusType;
  multiplier: number;
}

const StyledLetterTile = styled(Tile)<IStyledLetterTile>`
  background-color: antiquewhite;
  color: green;

  ${(props) =>
    props.isScoreInvalid &&
    css`
      background-color: lightgray;
      cursor: default;
    `}

  ${(props) => {
    if (props.bonusType === BonusType.Tile) {
      if (props.multiplier === 2) {
        return css`
          background-color: #6cf;
        `;
      } else if (props.multiplier === 3) {
        return css`
          background-color: #09f;
        `;
      }
    }

    if (props.bonusType === BonusType.Word) {
      if (props.multiplier === 2) {
        return css`
          background-color: #f9f;
        `;
      } else if (props.multiplier === 3) {
        return css`
          background-color: #f66;
        `;
      }
    }
  }}
`;

interface LetterTileProps {
  index: number;
  character: string;
  score: number;
  bonus: Bonus;
  cycleLetterBonus: Function;
}

interface CharacterProps {
  multigraph: number | false;
}

const Character = styled.span<CharacterProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -55%);
  line-height: 1;

  ${(props) => {
    if (props.multigraph === 2) {
      return css`
        transform: translate(-60%, -55%) scaleX(0.65);
      `;
    }

    if (props.multigraph === 3) {
      return css`
        transform: translate(-60%, -55%) scaleX(0.4);
      `;
    }
  }}
`;

const Score = styled.span`
  position: relative;
  left: 0.925rem;
  top: -0.25rem;
  font-size: 1.25rem;
`;

export default function LetterTile({
  index = 0,
  character = " ",
  score = 0,
  bonus,
  cycleLetterBonus,
}: LetterTileProps) {
  const isBlankTile = character === " ";
  const isScoreInvalid = Number.isNaN(score);

  function renderScore() {
    if (isBlankTile) return null;
    if (isScoreInvalid) return "?";
    return score;
  }

  return (
    <StyledLetterTile
      isScoreInvalid={isScoreInvalid}
      bonusType={bonus.type}
      multiplier={bonus.multiplier}
      onClick={() => cycleLetterBonus(index)}
      onKeyDown={(e) => (e.key === "Enter" ? cycleLetterBonus(index) : null)}
      tabIndex={0}
    >
      <Character multigraph={character.length > 1 && character.length}>
        {character.toUpperCase()}
      </Character>
      <Score>{renderScore()}</Score>
    </StyledLetterTile>
  );
}
