import {
  SCORE_TABLE,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS as SCORE_MULTIPLIERS
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
    if (SCORE_TABLE[this.languageCode].digraphs) {
      this.checkForDigraphs(letters);
    }
    return letters.map(letter => new Letter(letter, this.languageCode));
  }

  checkForDigraphs(letters) {
    // special case for double letters (i.e. in Spanish)
    for (let i = 0; i < letters.length; i++) {
      for (const digraph of SCORE_TABLE[this.languageCode].digraphs) {
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
    for (const timesUsed in this.bonusesUsed) {
      multiplierTotal *= this.bonusesUsed[timesUsed] * SCORE_MULTIPLIERS[timesUsed];
    }
    return multiplierTotal;
  }

  isAnyLetterInvalid() {
    return this.letters.some(element => !Number.isInteger(element.score));
  }

  isNextWordBonusAllowed() {
    // there cannot ever be more word bonuses than total number of letters
    let totalTimesBonusesUsed = 0;
    for (const timesUsed in this.bonusesUsed) {
      totalTimesBonusesUsed += this.bonusesUsed[timesUsed];
    }
    for (const letter of this.letters) {
      if (letter.scoreMultiplier > 1) {
        totalTimesBonusesUsed++;
      }
    }
    return this.letters.length > totalTimesBonusesUsed;
  }

  addBonus(bonusType) {
    if (this.isNextWordBonusAllowed()) {
      if (this.bonusesUsed.hasOwnProperty(bonusType)) {
        this.bonusesUsed[bonusType]++;
      } else {
        this.bonusesUsed[bonusType] = 1;
      }
    }
  }

  isBingoAllowed() {
    return this.letters.length >= MINIMUM_LETTERS_FOR_BINGO;
  }

  toggleBingo() {
    if (this.isBingoAllowed()) {
      this.isBingoUsed = !this.isBingoUsed;
    }
  }
}
