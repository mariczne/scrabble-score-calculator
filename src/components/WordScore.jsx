import React, { useContext } from "react";
import { WordContext } from "../context/word";
import { getWordScore } from "../modules/calculator";

const INVALID_SCORE_TEXT = "At least one tile invalid";

export default function WordScore() {
  const {
    wordReducer: [state]
  } = useContext(WordContext);

  const score = getWordScore(state.input, {
    languageCode: state.language,
    wordBonuses: state.wordBonuses,
    tileBonuses: state.tileBonuses,
    isBingoUsed: state.isBingoUsed
  });

  const isScoreInvalid = Number.isNaN(score);

  return (
    <span className="word-score">
      Word score:{" "}
      {isScoreInvalid ? (
        INVALID_SCORE_TEXT
      ) : (
        <span data-testid="word-score-value">{score}</span>
      )}
    </span>
  );
}
