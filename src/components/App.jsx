import React from "react";
import LangSelect from "./LangSelect";
import WordInput from "./WordInput";
import BonusTiles from "./BonusTiles";
import LetterTiles from "./LetterTiles";
import WordScore from "./WordScore";
import Instructions from "./Instructions";
import Footer from "./Footer";
import "./App.css";

import { WordContextProvider } from "../context/word";

export default function App() {
  return (
    <div className="App">
      <WordContextProvider>
        <LangSelect />
        <WordInput />
        <BonusTiles />
        <LetterTiles />
        <WordScore />
        <Instructions />
        <Footer />
      </WordContextProvider>
    </div>
  );
}
