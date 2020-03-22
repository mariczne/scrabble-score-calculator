export function checkIsBonusDefinedInScoretable({
  wordScoreMultipliers,
  bonusType
}) {
  if (!isBonusDefinedInScoretable({ wordScoreMultipliers, bonusType })) {
    throw new RangeError(`No '${bonusType}' bonus type in the score table`);
  }
}

export function isBonusDefinedInScoretable({
  wordScoreMultipliers,
  bonusType
}) {
  return wordScoreMultipliers.hasOwnProperty(bonusType);
}
