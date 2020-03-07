import React, { Component } from "react";
import Word from "../modules/Word";
import LetterTile from "./Tile/LetterTile";
import BonusTile from "./Tile/BonusTile";
import { SCORE_TABLE } from "../scoretable";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      languageCode: localStorage.getItem("languageCode") || "EN",
      word: new Word("", localStorage.getItem("languageCode") || "EN")
    };
  }

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
    word.letters[index].cycleBonus();
    this.setState({ word: word });
  };

  handleWordBonus = bonusType => {
    const { word } = this.state;
    if (bonusType === "bingo") word.toggleBingo();
    else word.addBonus(bonusType);
    this.setState({ word: word });
  };

  renderLetterTiles = () => {
    const { word } = this.state;
    return word.letters.map((letter, index) => (
      <LetterTile
        key={index}
        index={index}
        character={letter.character}
        score={letter.score}
        scoreMultiplier={letter.scoreMultiplier}
        cycleLetterBonus={this.cycleLetterBonus}
      />
    ));
  };

  renderWordScore = () => {
    const { word } = this.state;

    if (Number.isNaN(word.score)) return "At least one invalid letter";
    return <span data-testid="word-score">{word.score}</span>;
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
    const { input, word, languageCode } = this.state;

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
          <BonusTile
            bonusType="double"
            timesUsed={word.timesDoubled}
            handleWordBonus={this.handleWordBonus}
          />
          <BonusTile
            bonusType="triple"
            timesUsed={word.timesTripled}
            handleWordBonus={this.handleWordBonus}
          />
          <BonusTile
            bonusType="bingo"
            handleWordBonus={this.handleWordBonus}
            isBingoAllowed={word.isBingoAllowed()}
            isBingoUsed={word.isBingoUsed}
          />
        </div>
        <div>{this.renderLetterTiles()}</div>
        Score: {this.renderWordScore()}
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

export default App;
