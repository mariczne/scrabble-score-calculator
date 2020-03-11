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

const DEFAULT_LANGUAGE = "eng";
const isGameUsingBingo = POINTS_FOR_BINGO > 0;

export default class App extends Component {
  state = {
    inputValue: "",
    languageCode: DEFAULT_LANGUAGE,
    word: new Word("", DEFAULT_LANGUAGE)
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value }, () => this.updateWord());
  };

  handleInputReset = () => {
    this.setState({ inputValue: "" }, () => this.updateWord());
  };

  handleLanguageChange = e => {
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
    if (word.isNextBonusAllowed() || letter.hasMultipliedScore()) {
      if (letter.scoreMultiplier === MAX_LETTER_SCORE_MULTIPLIER) {
        letter.scoreMultiplier = 1;
      } else {
        letter.scoreMultiplier++;
      }
    }
    this.setState({ word: word });
  };

  addBonus = bonusType => {
    const { word } = this.state;
    word.addBonus(bonusType);
    this.setState({ word: word });
  };

  removeBonus = bonusType => {
    const { word } = this.state;
    word.removeBonus(bonusType);
    this.setState({ word: word });
  };

  handleBingo = () => {
    if (isGameUsingBingo) {
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
      handleInputReset,
      addBonus,
      removeBonus,
      handleBingo,
      cycleLetterBonus
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
          handleInputReset={handleInputReset}
        />
        <BonusTiles
          addBonus={addBonus}
          removeBonus={removeBonus}
          bonusesUsed={word.bonusesUsed}
          isNextBonusAllowed={word.isNextBonusAllowed()}
          isGameUsingBingo={isGameUsingBingo}
          handleBingo={handleBingo}
          isBingoAllowed={word.isBingoAllowed()}
          isBingoUsed={word.isBingoUsed}
        />
        <LetterTiles
          letters={word.letters}
          cycleLetterBonus={cycleLetterBonus}
        />
        <WordScore isScoreInvalid={word.hasInvalidScore()} score={word.score} />
        <Instructions />
        <Footer />
      </div>
    );
  }
}
