import React from "react";
import LangSelect from "./LangSelect";
import WordInput from "./WordInput";
import LetterTiles from "./LetterTiles";
import WordScore from "./WordScore";
import Instructions from "./Instructions";
import Footer from "./Footer";
import "./App.css";

import { WordContextProvider } from "../context/wordContext";

export default function App() {
  return (
    <div className="App">
      <WordContextProvider>
        <LangSelect />
        <WordInput />
        <LetterTiles />
        <WordScore />
        <Instructions />
        <Footer />
      </WordContextProvider>
    </div>
  );
}
