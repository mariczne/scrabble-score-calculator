import React from "react";
import Tile from "./Tile";
import styled from "styled-components";

export default function BingoTile({
  bingoName = "Bingo",
  isBingoAllowed = false,
  isBingoUsed = false,
  textWhenBingoUsed = "active",
  toggleBingo,
}: BingoTileProps) {
  return (
    <StyledBingoTile
      allowed={isBingoAllowed}
      onClick={toggleBingo}
      onKeyDown={(e) => (e.key === "Enter" ? toggleBingo() : null)}
      tabIndex={0}
    >
      <BingoName>{bingoName}</BingoName>
      {isBingoUsed && <TextWhenUsed>{textWhenBingoUsed}</TextWhenUsed>}
    </StyledBingoTile>
  );
}

interface IStyledBingoTile {
  allowed: boolean;
}

const StyledBingoTile = styled(Tile)<IStyledBingoTile>`
  background-color: ${(props) => (props.allowed ? "orange" : "lightgray")};
  cursor: ${(props) => (props.allowed ? "pointer" : "default")};
`;

interface BingoTileProps {
  bingoName: string;
  toggleBingo: () => void;
  isBingoAllowed: boolean;
  isBingoUsed: boolean;
  textWhenBingoUsed: string;
}

const BingoName = styled.span`
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.5rem;
  color: black;
`;

const TextWhenUsed = styled.span`
  text-transform: uppercase;
  position: absolute;
  right: 0.25rem;
  top: 2.5rem;
  font-size: 0.825rem;
  color: black;
`;
