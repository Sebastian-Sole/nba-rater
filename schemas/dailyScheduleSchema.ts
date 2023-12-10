import { z } from "zod";
import { leagueSchema, timeZonesSchema, venueSchema } from "./common";

export const dailyScheduleTeamSchema = z.object({
  name: z.string(),
  alias: z.string(),
  id: z.string(),
  sr_id: z.string(),
  reference: z.string(),
});

export const broadcastSchema = z.object({
  network: z.string(),
  type: z.string(),
  locale: z.string(),
  channel: z.string(),
});

export const gameSchema = z.object({
  id: z.string(),
  status: z.string(),
  coverage: z.string(),
  scheduled: z.string(),
  home_points: z.number(),
  away_points: z.number(),
  track_on_court: z.boolean(),
  sr_id: z.string(),
  reference: z.string(),
  time_zones: timeZonesSchema,
  venue: venueSchema,
  broadcasts: z.array(broadcastSchema),
  home: dailyScheduleTeamSchema,
  away: dailyScheduleTeamSchema,
});

export const dailyScheduleSchema = z.object({
  date: z.string(),
  league: leagueSchema,
  games: z.array(gameSchema),
});

export type DailySchedule = z.infer<typeof dailyScheduleSchema>;
export type Game = z.infer<typeof gameSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type League = z.infer<typeof leagueSchema>;
export type TimeZones = z.infer<typeof timeZonesSchema>;
export type Broadcast = z.infer<typeof broadcastSchema>;
export type DailyScheduleTeam = z.infer<typeof dailyScheduleTeamSchema>;
