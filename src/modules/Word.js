import {
  SCORE_TABLE,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS
} from "./scoretable";
import Letter from "./Letter";
import {
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage,
  processMultigraphs
} from "./util/multigraph";
import { checkIsBonusDefinedInScoretable } from "./util/bonus";
import { checkIsLanguageDefinedInScoretable } from "./util/language";

export default class Word {
  constructor(input, languageCode) {
    this.handleErrors(input, languageCode);
    this.languageCode = languageCode;
    this.letters = Word.createLetters(input, languageCode);
    this.bonusesUsed = {};
    this.isBingoUsed = false;
  }

  handleErrors = (input, languageCode) => {
    if (typeof input !== "string" || typeof languageCode !== "string") {
      throw new TypeError("Both arguments have to be of type 'string'");
    }
    checkIsLanguageDefinedInScoretable({
      scoreTable: SCORE_TABLE,
      languageCode
    });
  };

  static createLetters(input, languageCode) {
    let letters = Array.from(input.toUpperCase());
    const language = {
      scoreTable: SCORE_TABLE,
      languageCode
    };
    if (isLanguageWithMultigraphs(language)) {
      const multigraphs = getMultigraphsInLanguage(language);
      letters = processMultigraphs(letters, multigraphs);
    }
    return letters.map(letter => new Letter(letter, languageCode));
  }

  getScore = () => {
    if (this.letters.length === 0) {
      return 0;
    }
    if (this.isAnyLetterInvalid()) {
      return NaN;
    }
    return (
      this.letters
        .map(element => element.getScore())
        .reduce((prev, curr) => (prev += curr))
        * this.getMultiplierTotal()
        + (this.isBingoUsed ? POINTS_FOR_BINGO : 0)
    );
  };

  isAnyLetterInvalid = () => {
    return this.letters.some(letter => !Number.isInteger(letter.getScore()));
  };

  getMultiplierTotal = () => {
    let multiplierTotal = 1;
    for (const bonusType in this.bonusesUsed) {
      const bonusMultiplier = WORD_SCORE_MULTIPLIERS[bonusType];
      for (let i = 0; i < this.timesBonusTypeUsed(bonusType); i++) {
        multiplierTotal *= bonusMultiplier;
      }
    }
    return multiplierTotal;
  };

  timesBonusTypeUsed = bonusType => {
    return this.bonusesUsed[bonusType];
  };

  addBonus = (bonusType, n = 1) => {
    const bonus = {
      wordScoreMultipliers: WORD_SCORE_MULTIPLIERS,
      bonusType
    };
    checkIsBonusDefinedInScoretable(bonus);
    if (n < 0) {
      throw new RangeError("Cannot add bonus a negative number of times");
    }
    while (n > 0) {
      if (this.isNextBonusAllowed()) {
        if (this.isBonusTypeUsed(bonusType)) {
          this.bonusesUsed[bonusType]++;
        } else {
          this.bonusesUsed[bonusType] = 1;
        }
      }
      n--;
    }
  };

  isBonusTypeUsed = bonusType => {
    return this.bonusesUsed.hasOwnProperty(bonusType);
  };

  isNextBonusAllowed = () => {
    // there cannot ever be more word+letter bonuses than total number of letters
    let totalTimesAnyBonusTypeUsed = 0;
    for (const bonusType in this.bonusesUsed) {
      totalTimesAnyBonusTypeUsed += this.timesBonusTypeUsed(bonusType);
    }
    for (const letter of this.letters) {
      if (letter.hasMultipliedScore()) {
        totalTimesAnyBonusTypeUsed++;
      }
    }
    return this.letters.length > totalTimesAnyBonusTypeUsed;
  };

  removeBonus = (bonusType, n = 1) => {
    const bonus = {
      wordScoreMultipliers: WORD_SCORE_MULTIPLIERS,
      bonusType
    };
    checkIsBonusDefinedInScoretable(bonus);
    if (n < 0) {
      throw new RangeError("Cannot remove bonus a negative number of times");
    }
    if (this.isBonusTypeUsed(bonusType)) {
      while (n > 0) {
        if (this.timesBonusTypeUsed(bonusType) === 1) {
          delete this.bonusesUsed[bonusType];
        } else if (this.timesBonusTypeUsed(bonusType) > 1) {
          this.bonusesUsed[bonusType]--;
        }
        n--;
      }
    }
  };

  toggleBingo = () => {
    if (this.isBingoAllowed()) {
      this.isBingoUsed = !this.isBingoUsed;
    }
  };

  isBingoAllowed = () => {
    const isGameUsingBingo = POINTS_FOR_BINGO > 0;
    if (isGameUsingBingo) {
      return this.letters.length >= MINIMUM_LETTERS_FOR_BINGO;
    }
    return false;
  };

  hasInvalidScore = () => {
    return Number.isNaN(this.getScore());
  };
}
