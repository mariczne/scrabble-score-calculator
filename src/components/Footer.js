import React from "react";

const FOOTER_STYLE = {
  fontSize: "0.625rem"
}

export default function Footer() {
  return (
    <footer style={FOOTER_STYLE}>
      SCRABBLE® is a registered trademark and all intellectual property rights
      are owned by their respective owners: Hasbro, Zynga, J.W. Spear & Mattel,
      etc.
    </footer>
  );
}
