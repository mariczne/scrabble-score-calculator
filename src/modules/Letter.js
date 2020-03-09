import { SCORE_TABLE, MAX_LETTER_SCORE_MULTIPLIER } from "./scoretable";

export default class Letter {
  constructor(character, languageCode) {
    if (typeof character !== "string" || typeof languageCode !== "string") {
      throw new TypeError("Both arguments have to be of type 'string'");
    }
    if (!SCORE_TABLE.hasOwnProperty(languageCode)) {
      throw new RangeError("Unsupported language");
    }

    this.character = character;
    this.languageCode = languageCode;
    this._scoreMultiplier = 1;
  }

  get score() {
    const score = Number(
      Object.keys(SCORE_TABLE[this.languageCode]).find(key =>
        SCORE_TABLE[this.languageCode][key].includes(
          this.character.toUpperCase()
        )
      )
    );
    return score * this._scoreMultiplier;
  }

  set scoreMultiplier(n) {
    if (!Number.isInteger(n)) {
      throw new TypeError("Argument has to be an integer");
    }
    if (n < 1 || n > MAX_LETTER_SCORE_MULTIPLIER) {
      throw new RangeError(
        `Argument has to be between 1 and ${MAX_LETTER_SCORE_MULTIPLIER}`
      );
    }

    this._scoreMultiplier = n;
  }

  get scoreMultiplier() {
    return this._scoreMultiplier;
  }

  isMultiplied() {
    return this._scoreMultiplier !== 1;
  }
}
