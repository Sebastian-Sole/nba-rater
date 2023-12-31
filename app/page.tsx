import CacheButton from "@/components/CacheButton";
import { GameSummary, gameSummarySchema } from "@/schemas/gameSummarySchema";
import { dailyScheduleSchema } from "@/schemas/dailyScheduleSchema";
import { getGameSummaryApiUrl, getDailyScheduleApiUrl } from "@/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  filterPlayersByMinutesPlayed,
  getQuarterScores,
  sortPlayersByMinutes,
} from "@/utils/gameSummary";

export default async function Home() {
  const selectedDate = {
    year: "2023",
    month: "12",
    day: "07",
  };

  const DAILY_SCHEDULE_URL = getDailyScheduleApiUrl(selectedDate);

  const dailyScheduleRes = await fetch(`${DAILY_SCHEDULE_URL}`, {
    next: { tags: ["dailySchedule"] },
  });

  if (!dailyScheduleRes.ok) {
    console.log(dailyScheduleRes.status);
    console.log("error");
    return (
      <div>
        <h1>Daily sched req error</h1>
        <CacheButton tag="dailySchedule">Revalidate Cache</CacheButton>
      </div>
    );
  }

  const data = await dailyScheduleRes.json();
  console.log(data);

  const parsedData = dailyScheduleSchema.safeParse(data);

  if (!parsedData.success) {
    // console.log(parsedData.error);
    console.log(parsedData.error.message);
    return (
      <div>
        <h1>Daily Schedule parsing error</h1>
        <CacheButton tag="dailySchedule">Revalidate Cache</CacheButton>
      </div>
    );
  }

  const { games } = parsedData.data;

  const gameSummaries: (GameSummary | null)[] = await Promise.all(
    games.map(async (game) => {
      const gameId = game.id;
      const GAME_SUMMARY_URL = getGameSummaryApiUrl(gameId);

      const gameSummaryRes = await fetch(`${GAME_SUMMARY_URL}`, {
        next: { tags: ["gameSummary"] },
      });

      if (!gameSummaryRes.ok) {
        console.log(gameSummaryRes.status);
        console.log("error");
        return null;
      }

      const data = await gameSummaryRes.json();

      const parsedData = gameSummarySchema.safeParse(data);
      if (!parsedData.success) {
        console.log(parsedData.error);
        return null;
      }
      return parsedData.data;
    })
  );

  return (
    <div>
      <h1>Home</h1>

      {gameSummaries.map((gameSummary, i) => {
        if (!gameSummary) {
          return (
            <div key={i}>
              <h1>Box Score fetch error</h1>
            </div>
          );
        }

        const { away, home, lead_changes, times_tied } = gameSummary;

        const homePlayers = sortPlayersByMinutes(home.players);
        const awayPlayers = sortPlayersByMinutes(away.players);

        // Filter out players who played less than 10 minutes

        const homePlayersFiltered = filterPlayersByMinutesPlayed(
          homePlayers,
          0
        );

        const awayPlayersFiltered = filterPlayersByMinutesPlayed(
          awayPlayers,
          0
        );

        const homeQuarterScores = getQuarterScores(homePlayersFiltered);
        const awayQuarterScores = getQuarterScores(awayPlayersFiltered);

        const isOvertimeGame = homeQuarterScores.length > 4;

        // Calculate the score after 3 quarters
        const homeScoreAfter3 = homeQuarterScores
          .slice(0, 3)
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0);

        const awayScoreAfter3 = awayQuarterScores
          .slice(0, 3)
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0);

        const scoreDifferenceAfter3 = Math.abs(
          homeScoreAfter3 - awayScoreAfter3
        );

        return (
          <div key={gameSummary.id}>
            <h1>
              {away.name} vs {home.name} - {away.alias} + {home.alias}
            </h1>

            <h3>Lead Changes:{lead_changes}</h3>
            <h3>Times Tied:{times_tied}</h3>
            <div className="flex flex-row justify-between flex-wrap">
              {homePlayersFiltered.map((player) => {
                const {
                  points,
                  assists,
                  rebounds,
                  blocks,
                  steals,
                  turnovers,
                  field_goals_pct,
                  minutes,
                } = player.statistics;

                return (
                  <Card className="w-[30%]" key={player.id}>
                    <CardTitle>{player.full_name}</CardTitle>
                    <CardDescription>
                      {player.jersey_number} / {player.primary_position} /{" "}
                      {player.starter ? "Starter" : "Bench"}
                    </CardDescription>
                    <CardContent>
                      <div className="flex flex-row w-full justify-around flex-wrap">
                        <p> {minutes} min</p>
                        <p> {points} pts </p>
                        <p> {assists} ast</p>
                        <p> {rebounds} reb</p>
                        <p> {blocks} blk</p>
                        <p> {steals} stl</p>
                        <p> {turnovers} tov</p>
                        <p> {field_goals_pct} fg%</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      <CacheButton tag="dailySchedule">Revalidate Cache</CacheButton>
    </div>
  );
}
