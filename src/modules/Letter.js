import { SCORE_TABLE, MAX_LETTER_SCORE_MULTIPLIER } from "./scoretable";
import { checkIsLanguageDefinedInScoretable } from "./util/language";

export default class Letter {
  constructor(character, languageCode) {
    this.handleErrors(character, languageCode);
    this.character = character;
    this.languageCode = languageCode;
    this._scoreMultiplier = 1;
  }

  handleErrors = (character, languageCode) => {
    if (typeof character !== "string" || typeof languageCode !== "string") {
      throw new TypeError("Both arguments have to be of type 'string'");
    }
    checkIsLanguageDefinedInScoretable({
      scoreTable: SCORE_TABLE,
      languageCode
    });
  };

  getScore = () => {
    const score = Number(
      Object.keys(SCORE_TABLE[this.languageCode]).find(key =>
        SCORE_TABLE[this.languageCode][key].includes(
          this.character.toUpperCase()
        )
      )
    );
    return score * this._scoreMultiplier;
  };

  setScoreMultiplier = n => {
    if (!Number.isInteger(n)) {
      throw new TypeError("Argument has to be an integer");
    }
    if (n < 1 || n > MAX_LETTER_SCORE_MULTIPLIER) {
      throw new RangeError(
        `Argument has to be between 1 and ${MAX_LETTER_SCORE_MULTIPLIER}`
      );
    }
    if (this.hasInvalidScore()) {
      throw new Error("Can't set multiplier to a letter with invalid score");
    }
    this._scoreMultiplier = n;
  };

  getScoreMultiplier = () => {
    return this._scoreMultiplier;
  };

  hasInvalidScore = () => {
    return Number.isNaN(this.getScore());
  };

  hasMultipliedScore = () => {
    return this._scoreMultiplier !== 1;
  };
}
