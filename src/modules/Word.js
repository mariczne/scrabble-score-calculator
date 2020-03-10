import {
  SCORE_TABLE,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS
} from "./scoretable";
import Letter from "./Letter";

export default class Word {
  constructor(input, languageCode) {
    if (typeof input !== "string" || typeof languageCode !== "string") {
      throw new TypeError("Both arguments have to be of type 'string'");
    }
    if (!SCORE_TABLE.hasOwnProperty(languageCode)) {
      throw new RangeError("Unsupported language");
    }

    this.languageCode = languageCode;
    this.letters = this.createLettersFromInput(input);
    this.bonusesUsed = {};
    this.isBingoUsed = false;
  }

  createLettersFromInput(input) {
    const letters = Array.from(input.toUpperCase());
    const isLanguageWithDigraphs = SCORE_TABLE[this.languageCode].digraphs;
    if (isLanguageWithDigraphs) {
      Word.checkForDigraphs(letters, this.languageCode);
    }
    return letters.map(letter => new Letter(letter, this.languageCode));
  }

  static checkForDigraphs(letters, languageCode) {
    const digraphs = SCORE_TABLE[languageCode].digraphs;
    for (let i = 0; i < letters.length; i++) {
      for (const digraph of digraphs) {
        if (letters[i] === digraph[0] && letters[i + 1] === digraph[1]) {
          letters[i] = letters[i] + letters[i + 1];
          letters.splice(i + 1, 1);
        }
      }
    }
  }

  get score() {
    if (this.letters.length === 0) {
      return 0;
    }
    if (this.isAnyLetterInvalid()) {
      return NaN;
    }
    return (
      this.letters
        .map(element => element.score)
        .reduce((prev, curr) => (prev += curr))
        * this.multiplierTotal
        + (this.isBingoUsed ? POINTS_FOR_BINGO : 0)
    );
  }

  get multiplierTotal() {
    let multiplierTotal = 1;
    for (const bonusName in this.bonusesUsed) {
      const timesBonusUsed = this.bonusesUsed[bonusName];
      const bonusMultiplier = WORD_SCORE_MULTIPLIERS[bonusName];
      multiplierTotal *= timesBonusUsed * bonusMultiplier;
    }
    return multiplierTotal;
  }

  isAnyLetterInvalid() {
    return this.letters.some(letter => !Number.isInteger(letter.score));
  }

  addBonus(bonusType) {
    if (!WORD_SCORE_MULTIPLIERS.hasOwnProperty(bonusType)) {
      throw new RangeError(`No '${bonusType}' bonus type in the score table`);
    }
    if (this.isNextBonusAllowed()) {
      if (this.bonusesUsed.hasOwnProperty(bonusType)) {
        this.bonusesUsed[bonusType]++;
      } else {
        this.bonusesUsed[bonusType] = 1;
      }
    }
  }

  isNextBonusAllowed() {
    // there cannot ever be more word+letter bonuses than total number of letters
    let totalTimesBonusesUsed = 0;
    for (const bonusName in this.bonusesUsed) {
      const timesBonusUsed = this.bonusesUsed[bonusName];
      totalTimesBonusesUsed += timesBonusUsed;
    }
    for (const letter of this.letters) {
      if (letter.isMultiplied()) {
        totalTimesBonusesUsed++;
      }
    }
    return this.letters.length > totalTimesBonusesUsed;
  }

  toggleBingo() {
    if (this.isBingoAllowed()) {
      this.isBingoUsed = !this.isBingoUsed;
    }
  }

  isBingoAllowed() {
    if (!POINTS_FOR_BINGO) {
      return false;
    }
    return this.letters.length >= MINIMUM_LETTERS_FOR_BINGO;
  }

  hasInvalidScore() {
    return Number.isNaN(this.score);
  }
}
