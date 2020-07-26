import React, { useContext } from "react";
import { WordContext } from "../context/wordContext";
import { getWordScore } from "../modules/calculator";
import styled from "styled-components";

const INVALID_SCORE_TEXT = "At least one tile invalid";

const StyledWordScore = styled.span`
  font-size: 1.5rem;
`;

export default function WordScore() {
  const {
    wordReducer: [state],
  } = useContext(WordContext);

  const score = getWordScore(state.input, {
    languageCode: state.language,
    bonuses: state.bonuses,
    isBingoUsed: state.isBingoUsed,
  });

  const isScoreInvalid = Number.isNaN(score);

  return (
    <StyledWordScore>
      Word score:{" "}
      {isScoreInvalid ? (
        INVALID_SCORE_TEXT
      ) : (
        <span data-testid="word-score-value">{score}</span>
      )}
    </StyledWordScore>
  );
}
