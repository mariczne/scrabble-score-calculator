import { SCORE_TABLE, POINTS_FOR_BINGO, MINIMUM_LETTERS_FOR_BINGO } from "../scoretable";
import Letter from "./Letter";

export default class Word {
  constructor(input, languageCode) {
    if (typeof input !== "string" || typeof languageCode !== "string") throw new TypeError("Both arguments have to be of type 'string'");
    if (!SCORE_TABLE.hasOwnProperty(languageCode)) throw new RangeError("Unsupported language");

    this.languageCode = languageCode;
    this.letters = this.createLettersFromInput(input);
    this.timesDoubled = 0;
    this.timesTripled = 0;
    this.isBingoUsed = false;
  }

  createLettersFromInput(input) {
    const letters = Array.from(input.toUpperCase());

    if (SCORE_TABLE[this.languageCode].digraphs) this.checkForDigraphs(letters);

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
    if (this.letters.length === 0) return 0;
    if (this.isAnyLetterInvalid()) return NaN;
    return (
      this.letters
        .map(element => element.score)
        .reduce((prev, curr) => (prev += curr)) 
        * this.multiplierTotal 
        + (this.isBingoUsed ? POINTS_FOR_BINGO : 0)
    );
  }

  get multiplierTotal() {
    return 1 * (this.timesDoubled * 2 || 1) * (this.timesTripled * 3 || 1)
  }

  isAnyLetterInvalid() {
    return this.letters.some(element => !Number.isInteger(element.score));
  }

  isNextWordBonusAllowed() {
    // there cannot ever be more word bonuses than total number of letters
    // in practice the limit is even lower
    return this.letters.length > this.timesDoubled + this.timesTripled;
  }

  addBonus(bonusType) {
    if (bonusType === "double" && this.isNextWordBonusAllowed()) {
      this.timesDoubled++;
    }
    if (bonusType === "triple" && this.isNextWordBonusAllowed()) {
      this.timesTripled++;
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
