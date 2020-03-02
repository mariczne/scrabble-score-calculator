import React, { Component } from "react";
import "./App.css";
import Tile from "./components/Tile/Tile";
import BonusTile from "./components/Tile/BonusTile";
import { SCORE_TABLE } from "./scoretables";

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      lang: "PL",
      letterMap: [],
      wordDoubleScore: 0,
      wordTripleScore: 0,
      wordBonusTotal: 1,
      bingoUsed: false
    };
  }

  handleWordChange = e => {
    this.setState({ word: e.target.value }, () => this.updateLetterMap());
  };

  handleLangChange = e => {
    this.setState({ lang: e.target.value }, () => this.updateLetterMap());
  };

  updateLetterMap = () => {
    const { word, lang } = this.state;
    const letters = Array.from(word);
    const letterMap = [];

    for (let i = 0; i < letters.length; i++) {
      const letter = {};
      letter.id = i;
      letter.letter = letters[i];
      letter.score = getScoreOfLetter(letters[i], SCORE_TABLE[lang]);
      letter.doubleScore = false;
      letter.tripleScore = false;
      letterMap.push(letter);
    }
    this.setState({
      letterMap: letterMap,
      wordDoubleScore: 0,
      wordTripleScore: 0,
      wordBonusTotal: 1,
      bingoUsed: false
    });
  };

  toggleLetterBonus = id => {
    const { letterMap } = this.state;
    const letter = letterMap[id];
    if (!letter.doubleScore && !letter.tripleScore) {
      letter.doubleScore = true;
      letter.score *= 2;
    } else if (letter.doubleScore) {
      letter.doubleScore = false;
      letter.tripleScore = true;
      letter.score = (letter.score / 2) * 3;
    } else if (letter.tripleScore) {
      letter.tripleScore = false;
      letter.score = letter.score / 3;
    }
    letterMap[id] = letter;
    this.setState({ letterMap: letterMap });
  };

  toggleWordBonus = type => {
    let { wordDoubleScore, wordTripleScore, wordBonusTotal, bingoUsed, letterMap } = this.state;
    const bingoAllowed = letterMap.length > 6
    if (type === "double")
      this.setState({
        wordDoubleScore: ++wordDoubleScore,
        wordBonusTotal: wordBonusTotal * 2
      });
    if (type === "triple")
      this.setState({
        wordTripleScore: ++wordTripleScore,
        wordBonusTotal: wordBonusTotal * 3
      });
    if (type === "bingo" && bingoAllowed) {
      this.setState({
        bingoUsed: !bingoUsed
      })
    }
  };

  renderTiles = () => {
    const { letterMap } = this.state;
    if (letterMap.length === 0) return null;
    return letterMap.map(letter => (
      <Tile
        id={letter.id}
        letter={letter.letter}
        score={letter.score}
        doubleScore={letter.doubleScore}
        tripleScore={letter.tripleScore}
        toggleLetterBonus={this.toggleLetterBonus}
      />
    ));
  };

  renderScore = () => {
    const { letterMap, wordBonusTotal, bingoUsed } = this.state;
    if (letterMap.length === 0) return 0;
    if (letterMap.some(element => !Number.isInteger(element.score)))
      return "At least one incorrect letter";
    return (
      letterMap
        .map(element => element.score)
        .reduce((prev, curr) => (prev += curr)) * wordBonusTotal + (bingoUsed ? 50 : 0)
    );
  };

  render() {
    const { word, lang, wordDoubleScore, wordTripleScore, bingoUsed, letterMap } = this.state;

    return (
      <div className="App">
        <p>Click on a tile to toggle its letter bonus</p>
        <p>All bonuses get reset when the word changes</p>
        <p>A blank tile can be entered by using the spacebar</p>
        <p>Bingo can be activated when there are at least 7 tiles used</p>
        <input
          type="text"
          value={word}
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
            times={wordDoubleScore}
            toggleWordBonus={this.toggleWordBonus}
          />
          <BonusTile
            type="triple"
            times={wordTripleScore}
            toggleWordBonus={this.toggleWordBonus}
          />
          <BonusTile
            type="bingo"
            times={wordTripleScore}
            toggleWordBonus={this.toggleWordBonus}
            bingoAllowed={letterMap.length > 6}
            bingoUsed={bingoUsed}
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

function getScoreOfLetter(letter, scoreTable) {
  const score = Number(
    Object.keys(scoreTable).find(key =>
      scoreTable[key].includes(letter.toUpperCase())
    )
  );
  if (Number.isInteger(score)) return score;
  return "?";
}
