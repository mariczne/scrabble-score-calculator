import React from "react";
import Tile from "./Tile";
import styled, { css } from "styled-components";

export default function BonusTile({ type, name }: BonusTileProps) {
  return (
    <StyledBonusTile type={type} name={name}>
      <BonusName>{`${name} ${type} SCORE`}</BonusName>
    </StyledBonusTile>
  );
}

interface IStyledBonusTile {
  type: string; // "letter" | "word";
  name: string; // "double" | "triple";
}

const StyledBonusTile = styled(Tile)<IStyledBonusTile>`
  cursor: default;

  ${(props) => {
    if (props.type === "letter") {
      if (props.name === "double") {
        return css`
          background-color: #6cf;
        `;
      } else if (props.name === "triple") {
        return css`
          background-color: #09f;
        `;
      }
    }

    if (props.type === "word") {
      if (props.name === "double") {
        return css`
          background-color: #f9f;
        `;
      } else if (props.name === "triple") {
        return css`
          background-color: #f66;
        `;
      }
    }
  }}
`;

interface BonusTileProps {
  type: string;
  name: string;
}

const BonusName = styled.span`
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.5rem;
  color: black;
`;
