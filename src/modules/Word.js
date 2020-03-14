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
    this.letters = Word.createLetters(input, languageCode);
    this.bonusesUsed = {};
    this.isBingoUsed = false;
  }

  static createLetters(input, languageCode) {
    const letters = Array.from(input.toUpperCase());
    if (isLanguageWithMultigraphs(languageCode)) {
      Word.processMultigraphs(letters, languageCode);
    }
    return letters.map(letter => new Letter(letter, languageCode));
  }

  static processMultigraphs(letters, languageCode) {
    let multigraphs = getMultigraphsInLanguage(languageCode);
    multigraphs = sortArrayByLengthDescending(multigraphs);

    letters.forEach(() => {
      multigraphs.forEach(multigraph => {
        const multigraphIndexAt = findIndexOfSubarray(letters, multigraph);
        const isMultigraphFound = multigraphIndexAt !== -1;
        if (isMultigraphFound) {
          letters.splice(
            multigraphIndexAt,
            multigraph.length,
            multigraph.join("")
          );
        }
      });
    });
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
  }

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
  }

  timesBonusTypeUsed = bonusType => {
    return this.bonusesUsed[bonusType];
  };

  addBonus = (bonusType, n = 1) => {
    checkIfBonusDefinedInScoretable(bonusType);
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
  }

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
    checkIfBonusDefinedInScoretable(bonusType);
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
  }

  toggleBingo = () => {
    if (this.isBingoAllowed()) {
      this.isBingoUsed = !this.isBingoUsed;
    }
  }

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

function isLanguageWithMultigraphs(languageCode) {
  return SCORE_TABLE[languageCode].hasOwnProperty("multigraphs");
}

function getMultigraphsInLanguage(languageCode) {
  return SCORE_TABLE[languageCode].multigraphs;
}

function checkIfBonusDefinedInScoretable(bonusType) {
  if (!isBonusDefinedInScoretable(bonusType)) {
    throw new RangeError(`No '${bonusType}' bonus type in the score table`);
  }
}

function isBonusDefinedInScoretable(bonusType) {
  return WORD_SCORE_MULTIPLIERS.hasOwnProperty(bonusType);
}

function findIndexOfSubarray(arr, subarr) {
  for (let i = 0; i < 1 + (arr.length - subarr.length); ++i) {
    if (subarr.every((element, j) => element === arr[i + j])) {
      return i;
    }
  }
  return -1;
}

function sortArrayByLengthDescending(arr) {
  return arr.sort((prev, curr) => curr.length - prev.length);
}
