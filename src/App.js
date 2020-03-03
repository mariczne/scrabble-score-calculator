import React, { Component } from "react";
import Word from "./Word";
import Tile from "./components/Tile/Tile";
import BonusTile from "./components/Tile/BonusTile";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      languageCode: "PL",
      word: new Word("", "PL")
    };
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value }, () => this.updateWord());
  };

  handleLanguageChange = e => {
    this.setState({ languageCode: e.target.value }, () => this.updateWord());
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

  toggleWordBonus = bonusType => {
    const { word } = this.state;
    if (bonusType === "bingo") word.toggleBingo();
    else word.addBonus(bonusType);
    this.setState({ word: word });
  };

  renderTiles = () => {
    const { word } = this.state;
    if (word.letters.length === 0) return null;
    return word.letters.map(letter => (
      <Tile
        index={letter.index}
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

  render() {
    const { input, word, languageCode } = this.state;

    return (
      <div className="App">
        Language:{" "}
        <select
          value={languageCode}
          onChange={this.handleLanguageChange}
          className="lang-select"
        >
          <option value="PL">Polish</option>
          <option value="EN">English</option>
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
            toggleWordBonus={this.toggleWordBonus}
          />
          <BonusTile
            bonusType="triple"
            times={word.timesTripled}
            toggleWordBonus={this.toggleWordBonus}
          />
          <BonusTile
            bonusType="bingo"
            toggleWordBonus={this.toggleWordBonus}
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
      </div>
    );
  }
}

export default App;
