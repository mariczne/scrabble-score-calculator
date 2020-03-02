import React, { Component } from "react";
import "./App.css";
import Tile from "./components/Tile/Tile";
import BonusTile from "./components/Tile/BonusTile";
import Word from "./Word";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      lang: "PL",
      word: new Word("", "PL")
    };
  }

  handleWordChange = e => {
    this.setState({ input: e.target.value }, () => this.updateLetterMap());
  };

  handleLangChange = e => {
    this.setState({ lang: e.target.value }, () => this.updateLetterMap());
  };

  updateLetterMap = () => {
    const { input, lang } = this.state;
    this.setState({ word: new Word(input, lang) });
  };

  toggleLetterBonus = id => {
    const { word } = this.state;
    word.letters[id].toggleBonus();
    this.setState({ word: word });
  };

  toggleWordBonus = type => {
    const { word } = this.state;
    if (type === "bingo") word.toggleBingo();
    else word.addBonus(type);
    this.setState({ word: word });
  };

  renderTiles = () => {
    const { word } = this.state;
    if (word.letters.length === 0) return null;
    return word.letters.map(letter => (
      <Tile
        id={letter.id}
        letter={letter.letter}
        score={letter.score}
        isScoreDoubled={letter.isScoreDoubled}
        isScoreTripled={letter.isScoreTripled}
        toggleLetterBonus={this.toggleLetterBonus}
      />
    ));
  };

  renderScore = () => {
    const { word } = this.state;
    if (word.letters.length === 0) return 0;
    if (word.letters.some(element => !Number.isInteger(element.score)))
      return "At least one invalid letter";
    return word.score;
  };

  render() {
    const { input, word, lang } = this.state;

    return (
      <div className="App">
        <p>Click on a tile to toggle its letter bonus</p>
        <p>All bonuses get reset when the word changes</p>
        <p>A blank tile can be entered by using the spacebar</p>
        <p>Bingo can be activated when there are at least 7 tiles used</p>
        <input
          type="search"
          value={input}
          onChange={this.handleWordChange}
          className="word-input"
        />
        <select value={lang} onChange={this.handleLangChange}>
          <option value="PL">Polish</option>
          <option value="EN">English</option>
        </select>
        <div>
          <BonusTile
            type="double"
            times={word.timesDoubled}
            toggleWordBonus={this.toggleWordBonus}
          />
          <BonusTile
            type="triple"
            times={word.timesTripled}
            toggleWordBonus={this.toggleWordBonus}
          />
          <BonusTile
            type="bingo"
            toggleWordBonus={this.toggleWordBonus}
            isBingoAllowed={word.letters.length > 6}
            isBingoUsed={word.isBingoUsed}
          />
        </div>
        <div>{this.renderTiles()}</div>
        Score: {this.renderScore()}
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
 