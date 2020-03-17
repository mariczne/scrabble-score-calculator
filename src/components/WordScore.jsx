import React from "react";
import PropTypes from "prop-types";
export default function WordScore({ isScoreInvalid, score, invalidScoreText }) {
  return (
    <span className="word-score">
      Word score:{" "}
      {isScoreInvalid ? (
        invalidScoreText
      ) : (
        <span data-testid="word-score-value">{score}</span>
      )}
    </span>
  );
}

WordScore.propTypes = {
  isScoreInvalid: PropTypes.bool,
  score: PropTypes.number,
  invalidScoreText: PropTypes.string
};

WordScore.defaultProps = {
  isScoreInvalid: false,
  score: 0,
  invalidScoreText: "At least one invalid letter"
};
