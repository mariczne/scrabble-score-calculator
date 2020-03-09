import React, { Component } from "react";
import Word from "../modules/Word";
import {
  SCORE_TABLE,
  MAX_LETTER_SCORE_MULTIPLIER,
  POINTS_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS
} from "../modules/scoretable";
import LetterTile from "./Tile/LetterTile";
import BonusTile from "./Tile/BonusTile";
import BingoTile from "./Tile/BingoTile";
import "./App.css";

const DEFAULT_LANGUAGE = "EN";
const BINGO_NAME = "bingo"; // American term, rest of the world uses "BONUS"
const INVALID_SCORE_TEXT = "At least one invalid letter";

export default class App extends Component {
  state = {
    input: "",
    languageCode: localStorage.getItem("languageCode") || DEFAULT_LANGUAGE,
    word: new Word("", localStorage.getItem("languageCode") || DEFAULT_LANGUAGE)
  };

  handleInputChange = e => {
    this.setState({ input: e.target.value }, () => this.updateWord());
  };

  handleLanguageChange = e => {
    localStorage.setItem("languageCode", e.target.value);
    this.setState({ languageCode: e.target.value }, () => this.updateWord());
  };

  updateWord = () => {
    const { input, languageCode } = this.state;
    this.setState({ word: new Word(input, languageCode) });
  };

  cycleLetterBonus = index => {
    const { word } = this.state;
    const letter = word.letters[index];
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
    const { word } = this.state;
    if (POINTS_FOR_BINGO) {
      word.toggleBingo();
    }
    this.setState({ word: word });
  };

  renderLetterTiles = () => {
    const {
      word: { letters }
    } = this.state;
    return letters.map(({ character, score, scoreMultiplier }, index) => (
      <LetterTile
        key={index}
        index={index}
        character={character}
        score={score}
        scoreMultiplier={scoreMultiplier}
        cycleLetterBonus={this.cycleLetterBonus}
      />
    ));
  };

  renderBonusTiles = () => {
    const { word } = this.state;
    const tiles = [];
    for (const bonusType in WORD_SCORE_MULTIPLIERS) {
      tiles.push(
        <BonusTile
          key={bonusType}
          bonusType={bonusType}
          timesUsed={word.bonusesUsed[bonusType]}
          handleBonus={this.handleBonus}
          isNextBonusAllowed={word.isNextBonusAllowed()}
        />
      );
    }
    return tiles;
  };

  renderBingoTile = () => {
    const { word } = this.state;
    if (POINTS_FOR_BINGO) {
      return (
        <BingoTile
          key={BINGO_NAME}
          bingoName={BINGO_NAME}
          handleBingo={this.handleBingo}
          isBingoAllowed={word.isBingoAllowed()}
          isBingoUsed={word.isBingoUsed}
        />
      );
    }
  };

  renderWordScore = () => {
    const { word } = this.state;
    if (Number.isNaN(word.score)) {
      return INVALID_SCORE_TEXT;
    }
    return <span data-testid="word-score-value">{word.score}</span>;
  };

  renderLanguageOptions = () => {
    const options = [];
    for (const languageCode in SCORE_TABLE) {
      options.push(
        <option key={languageCode} value={languageCode}>
          {SCORE_TABLE[languageCode].displayName}
        </option>
      );
    }
    return options;
  };

  render() {
    const { input, languageCode } = this.state;

    return (
      <div className="App">
        Language:
        <select
          value={languageCode}
          onChange={this.handleLanguageChange}
          className="lang-select"
          data-testid="lang-select"
        >
          {this.renderLanguageOptions()}
        </select>
        <input
          type="search"
          value={input}
          onChange={this.handleInputChange}
          className="word-input"
          data-testid="word-input"
          placeholder="Type a word to start"
        />
        <div>
          {this.renderBonusTiles()}
          {this.renderBingoTile()}
        </div>
        <div>{this.renderLetterTiles()}</div>
        <span className="word-score">Score: {this.renderWordScore()}</span>
        <p>Click on a tile to toggle its letter bonus</p>
        <p>All bonuses get reset when user input changes</p>
        <p>A blank tile can be entered by using the spacebar</p>
        <p>Bingo can be activated when there are at least 7 tiles used</p>
        <p>
          <a href="https://en.wikipedia.org/wiki/Scrabble#Scoring">
            Scrabble scoring rules
          </a>
        </p>
        <footer style={{ fontSize: "x-small" }}>
          SCRABBLE® is a registered trademark and all intellectual property
          rights are owned by their respective owners: Hasbro, Zynga, J.W. Spear
          & Mattel, etc.
        </footer>
      </div>
    );
  }
}
