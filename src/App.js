import React, { Component } from "react";
import "./App.css";
import Tile from "./components/Tile/Tile";

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      lang: "PL",
      letterMap: ""
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
    for (let letter of letters) {
      letterMap.push([letter[0], getScoreOfLetter(letter, SCORE_TABLE[lang])]);
    }
    this.setState({ letterMap: letterMap });
  };

  renderTiles = () => {
    const { letterMap } = this.state;
    if (!letterMap || letterMap.length === 0) return null;
    return letterMap.map(letter => (
      <Tile letter={letter[0]} score={letter[1]} />
    ));
  };

  renderScore = () => {
    const { letterMap } = this.state;
    if (!letterMap || letterMap.length === 0) return 0;
    if (letterMap.some(el => !Number.isInteger(el[1])))
      return "At least one incorrect letter";
    return letterMap
      .map(element => element[1])
      .reduce((prev, curr) => (prev += curr));
  };

  render() {
    const { word, lang } = this.state;

    return (
      <div className="App">
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
        <div>{this.renderTiles()}</div>
        Score: {this.renderScore()}
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

const SCORE_TABLE = {
  PL: {
    0: [" "],
    1: ["A", "I", "E", "O", "N", "Z", "R", "S", "W"],
    2: ["Y", "C", "D", "K", "L", "M", "P", "T"],
    3: ["B", "G", "H", "J", "Ł", "U"],
    4: [],
    5: ["Ą", "Ę", "F", "Ó", "Ś", "Ż"],
    6: ["Ć"],
    7: ["Ń"],
    8: [],
    9: ["Ź"],
    10: []
  },
  EN: {
    0: [" "],
    1: ["E", "A", "I", "O", "N", "R", "T", "L", "S", "U"],
    2: ["D", "G"],
    3: ["B", "C", "M", "P"],
    4: ["F", "H", "V", "W", "Y"],
    5: ["K"],
    6: [],
    7: [],
    8: ["J", "X"],
    9: [],
    10: ["Q", "Z"]
  }
};
