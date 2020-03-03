import Letter from "./Letter";

export default class Word {
  constructor(input, languageCode) {
    this.input = input;
    this.languageCode = languageCode;
    this.timesDoubled = 0;
    this.timesTripled = 0;
    this.multiplierTotal = 1;
    this.isBingoUsed = false;
    this.letters = this.getLetters();
  }

  getLetters() {
    const letters = Array.from(this.input);

    return letters.map((letter, index) => new Letter(index, letter, this.languageCode))
  }

  get score() {
    if (this.letters.length === 0) return 0;
    if (this.letters.some(element => !Number.isInteger(element.score)))
      return NaN;
    return (
      this.letters
        .map(element => element.score)
        .reduce((prev, curr) => (prev += curr))
        * this.multiplierTotal
        + (this.isBingoUsed ? 50 : 0)
    );
  }

  isNextWordBonusAllowed() {
    // there cannot ever be more word bonuses than total number of letters
    // in practice the limit is even lower
    return this.letters.length > this.timesDoubled + this.timesTripled;
  }

  addBonus(bonusType) {
    if (bonusType === "double" && this.isNextWordBonusAllowed()) {
      this.timesDoubled++;
      this.multiplierTotal *= 2;
    }
    if (bonusType === "triple" && this.isNextWordBonusAllowed()) {
      this.timesTripled++;
      this.multiplierTotal *= 3;
    }
  }

  isBingoAllowed() {
    return this.letters.length > 6;
  }

  toggleBingo() {
    if (this.isBingoAllowed()) {
      this.isBingoUsed = !this.isBingoUsed;
    }
  }
}
