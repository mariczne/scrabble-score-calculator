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
    const targetValue = e.target.value;
    this.setState(state => {
      return {
        inputValue: targetValue,
        word: new Word(targetValue, state.languageCode)
      };
    });
  };

  handleInputReset = () => {
    this.setState(state => {
      return {
        inputValue: "",
        word: new Word("", state.languageCode)
      };
    });
  };

  handleLanguageChange = e => {
    const targetValue = e.target.value;
    this.setState(state => {
      return {
        languageCode: targetValue,
        word: new Word(state.inputValue, targetValue)
      };
    });
  };

  cycleLetterBonus = index => {
    const { word } = this.state;
    const letter = word.letters[index];
    if (letter.hasInvalidScore()) {
      return;
    }
    if (word.isNextBonusAllowed() || letter.hasMultipliedScore()) {
      this.setState(state => {
        const word = { ...state.word };
        const letter = word.letters[index];
        if (letter.getScoreMultiplier() === MAX_LETTER_SCORE_MULTIPLIER) {
          letter.setScoreMultiplier(1);
        } else {
          letter.setScoreMultiplier(letter.getScoreMultiplier() + 1);
        }
        return { word };
      });
    }
  };

  addBonus = bonusType => {
    this.setState(state => {
      const word = { ...state.word };
      word.addBonus(bonusType);
      return { word };
    });
  };

  removeBonus = bonusType => {
    this.setState(state => {
      const word = { ...state.word };
      word.removeBonus(bonusType);
      return { word };
    });
  };

  handleBingo = () => {
    if (isGameUsingBingo) {
      this.setState(state => {
        const word = { ...state.word };
        word.toggleBingo();
        return { word };
      });
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
        <WordScore
          isScoreInvalid={word.hasInvalidScore()}
          score={word.getScore()}
        />
        <Instructions />
        <Footer />
      </div>
    );
  }
}
