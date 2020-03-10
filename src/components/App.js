import React, { Component } from "react";
import Word from "../modules/Word";
import {
  MAX_LETTER_SCORE_MULTIPLIER,
  POINTS_FOR_BINGO
} from "../modules/scoretable";
import LangSelect from "./LangSelect";
import WordInput from "./WordInput";
import WordScore from "./WordScore";
import BonusTiles from "./BonusTiles";
import LetterTiles from "./LetterTiles";
import Instructions from "./Instructions";
import Footer from "./Footer";
import "./App.css";

const DEFAULT_LANGUAGE = "EN";

export default class App extends Component {
  state = {
    inputValue: "",
    languageCode: localStorage.getItem("languageCode") || DEFAULT_LANGUAGE,
    word: new Word("", localStorage.getItem("languageCode") || DEFAULT_LANGUAGE)
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value }, () => this.updateWord());
  };

  handleLanguageChange = e => {
    localStorage.setItem("languageCode", e.target.value);
    this.setState({ languageCode: e.target.value }, () => this.updateWord());
  };

  updateWord = () => {
    const { inputValue, languageCode } = this.state;
    this.setState({ word: new Word(inputValue, languageCode) });
  };

  cycleLetterBonus = index => {
    const { word } = this.state;
    const letter = word.letters[index];
    if (letter.hasInvalidScore()) {
      return;
    }
    if (letter.isMultiplied() || word.isNextBonusAllowed()) {
      if (letter.scoreMultiplier === MAX_LETTER_SCORE_MULTIPLIER) {
        letter.scoreMultiplier = 1;
      } else {
        letter.scoreMultiplier++;
      }
    }
    this.setState({ word: word });
  };

  handleBonus = bonusType => {
    const { word } = this.state;
    word.addBonus(bonusType);
    this.setState({ word: word });
  };

  handleBingo = () => {
    if (POINTS_FOR_BINGO) {
      const { word } = this.state;
      word.toggleBingo();
      this.setState({ word: word });
    }
  };

  render() {
    const { inputValue, languageCode, word } = this.state;
    const {
      handleLanguageChange,
      handleInputChange,
      handleBonus,
      handleBingo
    } = this;

    return (
      <div className="App">
        <LangSelect
          currentLanguageCode={languageCode}
          handleLanguageChange={handleLanguageChange}
        />
        <WordInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
        <BonusTiles
          word={word}
          handleBonus={handleBonus}
          handleBingo={handleBingo}
        />
        <LetterTiles
          letters={word.letters}
          cycleLetterBonus={this.cycleLetterBonus}
        />
        <WordScore
          wordHasInvalidScore={word.hasInvalidScore()}
          score={word.score}
        />
        <Instructions />
        <Footer />
      </div>
    );
  }
}
