import { SCORE_TABLE } from "./scoretable";

export default class Letter {
  constructor(character, languageCode) {
    this.character = character;
    this.languageCode = languageCode;
    this.isScoreDoubled = false;
    this.isScoreTripled = false;
  }

  get score() {
    let score = Number(
      Object.keys(SCORE_TABLE[this.languageCode]).find(key =>
        SCORE_TABLE[this.languageCode][key].includes(this.character.toUpperCase())
      )
    );
    if (this.isScoreDoubled) score *= 2;
    if (this.isScoreTripled) score *= 3;
    if (Number.isInteger(score)) return score;
    return "?";
  }

  toggleBonus() {
    if (!this.isScoreDoubled && !this.isScoreTripled) {
      this.isScoreDoubled = true;
    } else if (this.isScoreDoubled) {
      this.isScoreDoubled = false;
      this.isScoreTripled = true;
    } else if (this.isScoreTripled) {
      this.isScoreTripled = false;
    }
    return this.score;
  }
}
