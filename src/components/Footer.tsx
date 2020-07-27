import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      SCRABBLE® is a registered trademark and all intellectual property rights
      are owned by their respective owners: Hasbro, Zynga, J.W. Spear & Mattel,
      etc.
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  font-size: 0.625rem;
`;
