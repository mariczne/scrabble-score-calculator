import React from "react";

const INVALID_SCORE_TEXT = "At least one invalid letter";

export default function WordScore({ wordHasInvalidScore, score }) {
  function renderWordScore() {
    if (wordHasInvalidScore) {
      return INVALID_SCORE_TEXT;
    }
    return <span data-testid="word-score-value">{score}</span>;
  }

  return <span className="word-score">Score: {renderWordScore()}</span>;
}
