import { Player } from "@/schemas/gameSummarySchema";

export const getQuarterScores = (players: Player[]): number[] => {
  const quarterScores: number[] = [];
  players.forEach((player) => {
    const { periods } = player.statistics;
    if (!periods) return;

    periods.forEach((period) => {
      const { number, points } = period;
      if (!number || !points) return;
      // Add to existing quarter score
      if (quarterScores[number - 1]) {
        quarterScores[number - 1] += points;
      } else {
        quarterScores[number - 1] = points;
      }
    });
  });
  return quarterScores;
};

export const filterPlayersByMinutesPlayed = (
  players: Player[],
  threshold: number
): Player[] => {
  return players.filter((player) => {
    const minutes = parseFloat(player.statistics.minutes);
    return minutes !== threshold;
  });
};

export const sortPlayersByMinutes = (players: Player[]): Player[] => {
  return players.sort((a, b) => {
    const aMinutes = parseFloat(a.statistics.minutes);
    const bMinutes = parseFloat(b.statistics.minutes);
    return bMinutes - aMinutes;
  });
};
