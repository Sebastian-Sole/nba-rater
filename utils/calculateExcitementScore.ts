export function calculateScoreDifferenceScore(
  pointsDifference: number,
  baseDifference: number = 1.5,
  exponentialRate: number = 0.8,
  startingScore: number = 100
): number {
  let score = startingScore;
  for (let i = 0; i < pointsDifference; i++) {
    score -= baseDifference * Math.exp(exponentialRate * i);
  }
  return score < 0 ? 0 : score;
}
