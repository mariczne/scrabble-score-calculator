import {
  SCORE_TABLE,
  WORD_SCORE_MULTIPLIERS,
  POINTS_FOR_BINGO,
  MINIMUM_LETTERS_FOR_BINGO
} from "../../constants/scoretable";
import {
  isLanguageWithMultigraphs,
  getMultigraphsInLanguage,
  processMultigraphs
} from "./util/multigraph";
import { checkIsLanguageDefinedInScoretable } from "./util/language";
import { checkIsBonusDefinedInScoretable } from "./util/bonus";

export const getWordScore = (
  input,
  {
    languageCode = "eng",
    scoreTable = SCORE_TABLE,
    wordBonuses = {},
    tileBonuses = {},
    isBingoUsed = false
  }
) => {
  if (!input) {
    return 0;
  }
  checkIsLanguageDefinedInScoretable({ scoreTable, languageCode });
  const tiles = getTilesInWord(input, { scoreTable, languageCode });
  return (
    tiles
      .map((tile, index) =>
        getTileScore(tile, {
          languageCode,
          scoreMultiplier: tileBonuses[index]
        })
      )
      .reduce((acc, curr) => (acc += curr)) 
      * getWordMultiplier(wordBonuses)
      + (isBingoUsed ? POINTS_FOR_BINGO : 0)
  );
};

export const getTileScore = (
  input,
  { languageCode = "eng", scoreTable = SCORE_TABLE, scoreMultiplier = 1 }
) => {
  checkIsLanguageDefinedInScoretable({ scoreTable, languageCode });
  const score = Number(
    Object.keys(scoreTable[languageCode]).find(key =>
      scoreTable[languageCode][key].includes(input.toUpperCase())
    )
  );
  return score * scoreMultiplier;
};

export const getTilesInWord = (
  input,
  { languageCode = "eng", scoreTable = SCORE_TABLE }
) => {
  const language = { scoreTable, languageCode };
  checkIsLanguageDefinedInScoretable(language);
  let tiles = Array.from(input.toUpperCase());
  if (isLanguageWithMultigraphs(language)) {
    const multigraphs = getMultigraphsInLanguage(language);
    tiles = processMultigraphs(tiles, multigraphs);
  }
  return tiles;
};

const getWordMultiplier = (wordBonuses = []) => {
  let multiplierTotal = 1;
  for (const bonusType in wordBonuses) {
    checkIsBonusDefinedInScoretable({
      wordScoreMultipliers: WORD_SCORE_MULTIPLIERS,
      bonusType
    });
    const bonusMultiplier = WORD_SCORE_MULTIPLIERS[bonusType];
    for (let i = 0; i < timesBonusTypeUsed(bonusType, wordBonuses); i++) {
      multiplierTotal *= bonusMultiplier;
    }
  }
  return multiplierTotal;
};

export const isNextBonusAllowed = state => {
  let totalTimesAnyBonusTypeUsed = 0;
  for (const bonusType in state.wordBonuses) {
    totalTimesAnyBonusTypeUsed += timesBonusTypeUsed(
      bonusType,
      state.wordBonuses
    );
  }
  for (const key in state.tileBonuses) {
    console.log("haha");
    console.log(state.tileBonuses[key]);
    if (state.tileBonuses[key] !== 1) {
      totalTimesAnyBonusTypeUsed++;
    }
    console.log(totalTimesAnyBonusTypeUsed);
  }
  const tiles = getTilesInWord(state.input, {
    languageCode: state.languageCode
  });
  return tiles.length > totalTimesAnyBonusTypeUsed;
};

const timesBonusTypeUsed = (bonusType, wordBonuses) => {
  return wordBonuses[bonusType];
};

export const isBingoAllowed = (
  state,
  minTilesForBingo = MINIMUM_LETTERS_FOR_BINGO
) => {
  return (
    getTilesInWord(state.input, { languageCode: state.language }).length >=
    minTilesForBingo
  );
};

export const Calculator = { getWordScore, getTileScore, getTilesInWord };
