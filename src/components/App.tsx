import React from "react";
import LangSelect from "./LangSelect";
import WordInput from "./WordInput";
import LetterTiles from "./LetterTiles";
import WordScore from "./WordScore";
import Instructions from "./Instructions";
import Footer from "./Footer";
import styled from "styled-components";

import { WordContextProvider } from "../context/wordContext";

export default function App() {
  return (
    <StyledApp>
      <WordContextProvider>
        <LangSelect />
        <WordInput />
        <LetterTiles />
        <WordScore />
        <Instructions />
        <Footer />
      </WordContextProvider>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  margin: 2rem auto;
  border: 4px solid white;
  border-radius: 5px;
  background-color: #3cb371;

  @media (max-width: 480px) {
    .App {
      border: none;
      margin: 0 auto;
    }

    html {
      background-color: #3cb371;
    }
  }
`;
