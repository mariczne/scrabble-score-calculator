export const MAX_LETTER_SCORE_MULTIPLIER = 3;
export const POINTS_FOR_BINGO = 50; // 0 disables bingo completely
export const MINIMUM_LETTERS_FOR_BINGO = 7;
export const WORD_SCORE_MULTIPLIERS = [
  { name: "double", multiplier: 2 },
  { name: "triple", multiplier: 3 }
];

export const MAX_WORD_SCORE_MULTIPLIER = WORD_SCORE_MULTIPLIERS.reduce(
  (max, current) => {
    if (current.multiplier > max) {
      return (max = current.multiplier);
    }
    return max;
  },
  1
);

const SETTINGS = {
  MAX_LETTER_SCORE_MULTIPLIER,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO,
  WORD_SCORE_MULTIPLIERS,
  MAX_WORD_SCORE_MULTIPLIER
};

export default SETTINGS;
