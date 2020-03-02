import Letter from "./Letter";

export default class Word {
  constructor(input, lang) {
    this.input = input;
    this.lang = lang;
    this.timesDoubled = 0;
    this.timesTripled = 0;
    this.multiplierTotal = 1;
    this.isBingoUsed = false;
    this.letters = this.getLetters();
  }

  getLetters() {
    const letters = Array.from(this.input);
    const letterMap = [];

    for (let i = 0; i < letters.length; i++) {
      letterMap.push(new Letter(i, letters[i], this.lang));
    }
    return letterMap;
  }

  get score() {
    if (this.letters.length === 0) return 0;
    if (this.letters.some(element => !Number.isInteger(element.score)))
      return "At least one invalid letter";
    return (
      this.letters
        .map(element => element.score)
        .reduce((prev, curr) => (prev += curr)) *
        this.multiplierTotal +
      (this.isBingoUsed ? 50 : 0)
    );
  }

  addBonus(type) {
    // there cannot ever be more word bonuses than total number of letters
    // in practice the limit is even lower
    const isNextWordBonusAllowed =
      this.letters.length > this.timesDoubled + this.timesTripled;

    if (type === "double" && isNextWordBonusAllowed) {
      this.timesDoubled++;
      this.multiplierTotal *= 2;
    }
    if (type === "triple" && isNextWordBonusAllowed) {
      this.timesTripled++;
      this.multiplierTotal *= 3;
    }
  }

  toggleBingo() {
    const isBingoAllowed = this.letters.length > 6;

    if (isBingoAllowed) {
      this.isBingoUsed = !this.isBingoUsed;
    }
  }
}
