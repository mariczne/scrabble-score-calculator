import React, { Component } from "react";
import Word from "./Word";
import Tile from "./components/Tile/Tile";
import BonusTile from "./components/Tile/BonusTile";
import { SCORE_TABLE } from "./scoretable";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      languageCode: localStorage.getItem("languageCode") || "EN",
      word: new Word("", "EN")
    };
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value }, () => this.updateWord());
  };

  handleLanguageChange = e => {
    this.setState({ languageCode: e.target.value }, () => this.updateWord());
    localStorage.setItem("languageCode", e.target.value);
  };

  updateWord = () => {
    const { input, languageCode } = this.state;
    this.setState({ word: new Word(input, languageCode) });
  };

  toggleLetterBonus = index => {
    const { word } = this.state;
    word.letters[index].toggleBonus();
    this.setState({ word: word });
  };

  handleWordBonus = bonusType => {
    const { word } = this.state;
    if (bonusType === "bingo") word.toggleBingo();
    else word.addBonus(bonusType);
    this.setState({ word: word });
  };

  renderTiles = () => {
    const { word } = this.state;
    return word.letters.map((letter, index) => (
      <Tile
        key={index}
        index={index}
        character={letter.character}
        score={letter.score}
        isScoreDoubled={letter.isScoreDoubled}
        isScoreTripled={letter.isScoreTripled}
        toggleLetterBonus={this.toggleLetterBonus}
      />
    ));
  };

  renderScore = () => {
    const { word } = this.state;

    if (Number.isNaN(word.score)) return "At least one invalid letter";
    return word.score;
  };

  renderLanguageOptions = () => {
    const options = [];
    for (const language in SCORE_TABLE) {
      options.push(
        <option key={language} value={language}>
          {SCORE_TABLE[language].displayName}
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
        >
          {this.renderLanguageOptions()}
        </select>
        <input
          type="search"
          value={input}
          onChange={this.handleInputChange}
          className="word-input"
          placeholder="Type a word to start"
        />
        <div>
          <BonusTile
            bonusType="double"
            times={word.timesDoubled}
            handleWordBonus={this.handleWordBonus}
          />
          <BonusTile
            bonusType="triple"
            times={word.timesTripled}
            handleWordBonus={this.handleWordBonus}
          />
          <BonusTile
            bonusType="bingo"
            handleWordBonus={this.handleWordBonus}
            isBingoAllowed={word.isBingoAllowed()}
            isBingoUsed={word.isBingoUsed}
          />
        </div>
        <div>{this.renderTiles()}</div>
        Score: {this.renderScore()}
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
