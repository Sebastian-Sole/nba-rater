import { z } from "zod";
import { timeZonesSchema, venueSchema } from "./common";

export enum EGameType {
  Reg = "REG",
}

export enum EPrimaryPosition {
  C = "C",
  PG = "PG",
  Pf = "PF",
  Sf = "SF",
  Sg = "SG",
}

export const mostUnansweredSchema = z.object({
  points: z.number(),
  own_score: z.number(),
  opp_score: z.number(),
});

export type MostUnanswered = z.infer<typeof mostUnansweredSchema>;

interface PlayerStats {
  minutes: string;
  field_goals_made: number;
  field_goals_att: number;
  field_goals_pct: number;
  three_points_made: number;
  three_points_att: number;
  three_points_pct: number;
  two_points_made: number;
  two_points_att: number;
  two_points_pct: number;
  blocked_att: number;
  free_throws_made: number;
  free_throws_att: number;
  free_throws_pct: number;
  offensive_rebounds: number;
  defensive_rebounds: number;
  rebounds: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  assists_turnover_ratio: number;
  personal_fouls: number;
  tech_fouls?: number;
  flagrant_fouls: number;
  pls_min: number;
  points: number;
  double_double?: boolean;
  triple_double?: boolean;
  effective_fg_pct: number;
  efficiency: number;
  efficiency_game_score: number;
  points_in_paint: number;
  points_in_paint_att: number;
  points_in_paint_made: number;
  points_in_paint_pct: number;
  true_shooting_att: number;
  true_shooting_pct: number;
  fouls_drawn: number;
  offensive_fouls: number;
  points_off_turnovers: number;
  second_chance_pts: number;
  fast_break_pts: number;
  fast_break_att: number;
  fast_break_made: number;
  fast_break_pct: number;
  defensive_rating?: number;
  offensive_rating?: number;
  coach_ejections?: number;
  minus?: number;
  plus?: number;
  defensive_rebounds_pct?: number;
  offensive_rebounds_pct?: number;
  rebounds_pct?: number;
  steals_pct?: number;
  turnovers_pct?: number;
  coach_tech_fouls?: number;
  second_chance_att: number;
  second_chance_made: number;
  second_chance_pct: number;
  periods?: PlayerStats[];
  type?: GameType;
  id?: string;
  number?: number;
  sequence?: number;
  team_turnovers?: number;
  team_rebounds?: number;
  player_tech_fouls?: number;
  team_tech_fouls?: number;
  bench_points?: number;
  biggest_lead?: number;
  points_against?: number;
  possessions?: number;
  opponent_possessions?: number;
  team_defensive_rebounds?: number;
  team_offensive_rebounds?: number;
  time_leading?: string;
  defensive_points_per_possession?: number;
  offensive_points_per_possession?: number;
  team_fouls?: number;
  total_rebounds?: number;
  total_fouls?: number;
  ejections?: number;
  foulouts?: number;
  most_unanswered?: MostUnanswered;
}

export const coachSchema = z.object({
  full_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  position: z.string().optional().default("Coach"),
  reference: z.string(),
  id: z.string().optional(),
});

export const scoringSchema = z.object({
  type: z.string(),
  number: z.number(),
  sequence: z.number(),
  points: z.number(),
});

export const officialSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  number: z.string(),
  assignment: z.string(),
  experience: z.string(),
});

export const gameTypeSchema = z.nativeEnum(EGameType);

export const primaryPositionSchema = z.nativeEnum(EPrimaryPosition);

export const playerStatisticsSchema: z.ZodSchema<PlayerStats> = z.lazy(() =>
  z.object({
    minutes: z.string(),
    field_goals_made: z.number(),
    field_goals_att: z.number(),
    field_goals_pct: z.number(),
    three_points_made: z.number(),
    three_points_att: z.number(),
    three_points_pct: z.number(),
    two_points_made: z.number(),
    two_points_att: z.number(),
    two_points_pct: z.number(),
    blocked_att: z.number(),
    free_throws_made: z.number(),
    free_throws_att: z.number(),
    free_throws_pct: z.number(),
    offensive_rebounds: z.number(),
    defensive_rebounds: z.number(),
    rebounds: z.number(),
    assists: z.number(),
    turnovers: z.number(),
    steals: z.number(),
    blocks: z.number(),
    assists_turnover_ratio: z.number(),
    personal_fouls: z.number(),
    tech_fouls: z.number().optional(),
    flagrant_fouls: z.number(),
    pls_min: z.number(),
    points: z.number(),
    double_double: z.boolean().optional(),
    triple_double: z.boolean().optional(),
    effective_fg_pct: z.number(),
    efficiency: z.number(),
    efficiency_game_score: z.number(),
    points_in_paint: z.number(),
    points_in_paint_att: z.number(),
    points_in_paint_made: z.number(),
    points_in_paint_pct: z.number(),
    true_shooting_att: z.number(),
    true_shooting_pct: z.number(),
    fouls_drawn: z.number(),
    offensive_fouls: z.number(),
    points_off_turnovers: z.number(),
    second_chance_pts: z.number(),
    fast_break_pts: z.number(),
    fast_break_att: z.number(),
    fast_break_made: z.number(),
    fast_break_pct: z.number(),
    defensive_rating: z.number().optional(),
    offensive_rating: z.number().optional(),
    coach_ejections: z.number().optional(),
    minus: z.number().optional(),
    plus: z.number().optional(),
    defensive_rebounds_pct: z.number().optional(),
    offensive_rebounds_pct: z.number().optional(),
    rebounds_pct: z.number().optional(),
    steals_pct: z.number().optional(),
    turnovers_pct: z.number().optional(),
    coach_tech_fouls: z.number().optional(),
    second_chance_att: z.number(),
    second_chance_made: z.number(),
    second_chance_pct: z.number(),
    periods: z.array(playerStatisticsSchema).optional(),
    type: gameTypeSchema.optional(),
    id: z.string().optional(),
    number: z.number().optional(),
    sequence: z.number().optional(),
    team_turnovers: z.number().optional(),
    team_rebounds: z.number().optional(),
    player_tech_fouls: z.number().optional(),
    team_tech_fouls: z.number().optional(),
    bench_points: z.number().optional(),
    biggest_lead: z.number().optional(),
    points_against: z.number().optional(),
    possessions: z.number().optional(),
    opponent_possessions: z.number().optional(),
    team_defensive_rebounds: z.number().optional(),
    team_offensive_rebounds: z.number().optional(),
    time_leading: z.string().optional(),
    defensive_points_per_possession: z.number().optional(),
    offensive_points_per_possession: z.number().optional(),
    team_fouls: z.number().optional(),
    total_rebounds: z.number().optional(),
    total_fouls: z.number().optional(),
    ejections: z.number().optional(),
    foulouts: z.number().optional(),
    most_unanswered: mostUnansweredSchema.optional(),
  })
);

export const playerSchema = z.object({
  full_name: z.string(),
  jersey_number: z.string(),
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  position: z.string(),
  primary_position: primaryPositionSchema,
  played: z.boolean().optional(),
  active: z.boolean().optional(),
  starter: z.boolean().optional(),
  on_court: z.boolean(),
  sr_id: z.string(),
  reference: z.string(),
  statistics: playerStatisticsSchema,
  name_suffix: z.string().optional(),
  not_playing_reason: z.string().optional(),
  not_playing_description: z.string().optional(),
  ejected: z.boolean().optional(),
});

export const teamStatisticsSchema = z.object({
  minutes: z.string(),
  field_goals_made: z.number(),
  field_goals_att: z.number(),
  field_goals_pct: z.number(),
  three_points_made: z.number(),
  three_points_att: z.number(),
  three_points_pct: z.number(),
  two_points_made: z.number(),
  two_points_att: z.number(),
  two_points_pct: z.number(),
  blocked_att: z.number(),
  free_throws_made: z.number(),
  free_throws_att: z.number(),
  free_throws_pct: z.number(),
  offensive_rebounds: z.number(),
  defensive_rebounds: z.number(),
  rebounds: z.number(),
  assists: z.number(),
  turnovers: z.number(),
  steals: z.number(),
  blocks: z.number(),
  assists_turnover_ratio: z.number(),
  personal_fouls: z.number(),
  ejections: z.number(),
  foulouts: z.number(),
  points: z.number(),
  fast_break_pts: z.number(),
  second_chance_pts: z.number(),
  team_turnovers: z.number(),
  points_off_turnovers: z.number(),
  team_rebounds: z.number(),
  flagrant_fouls: z.number(),
  player_tech_fouls: z.number(),
  team_tech_fouls: z.number(),
  coach_tech_fouls: z.number(),
  points_in_paint: z.number(),
  pls_min: z.number(),
  effective_fg_pct: z.number(),
  bench_points: z.number(),
  points_in_paint_att: z.number(),
  points_in_paint_made: z.number(),
  points_in_paint_pct: z.number(),
  true_shooting_att: z.number(),
  true_shooting_pct: z.number(),
  biggest_lead: z.number(),
  fouls_drawn: z.number(),
  offensive_fouls: z.number(),
  efficiency: z.number(),
  efficiency_game_score: z.number(),
  defensive_rating: z.number(),
  offensive_rating: z.number(),
  coach_ejections: z.number(),
  points_against: z.number(),
  possessions: z.number(),
  opponent_possessions: z.number(),
  team_defensive_rebounds: z.number(),
  team_offensive_rebounds: z.number(),
  time_leading: z.string(),
  defensive_points_per_possession: z.number(),
  offensive_points_per_possession: z.number(),
  team_fouls: z.number(),
  total_rebounds: z.number(),
  total_fouls: z.number(),
  second_chance_att: z.number(),
  second_chance_made: z.number(),
  second_chance_pct: z.number(),
  fast_break_att: z.number(),
  fast_break_made: z.number(),
  fast_break_pct: z.number(),
  most_unanswered: mostUnansweredSchema,
  periods: z.array(playerStatisticsSchema),
});

export const summaryTeamSchema = z.object({
  name: z.string(),
  alias: z.string(),
  market: z.string(),
  id: z.string(),
  points: z.number(),
  bonus: z.boolean(),
  sr_id: z.string(),
  reference: z.string(),
  scoring: z.array(scoringSchema),
  statistics: teamStatisticsSchema,
  coaches: z.array(coachSchema),
  players: z.array(playerSchema),
});

export const gameSummarySchema = z.object({
  id: z.string(),
  status: z.string(),
  coverage: z.string(),
  scheduled: z.string(),
  duration: z.string(),
  attendance: z.number(),
  lead_changes: z.number(),
  times_tied: z.number(),
  clock: z.string(),
  quarter: z.number(),
  track_on_court: z.boolean(),
  reference: z.string(),
  entry_mode: z.string(),
  sr_id: z.string(),
  clock_decimal: z.string(),
  time_zones: timeZonesSchema,
  venue: venueSchema,
  home: summaryTeamSchema,
  away: summaryTeamSchema,
  officials: z.array(officialSchema),
});

export type Coach = z.infer<typeof coachSchema>;
export type Scoring = z.infer<typeof scoringSchema>;
export type Official = z.infer<typeof officialSchema>;
export type GameType = z.infer<typeof gameTypeSchema>;
export type PrimaryPosition = z.infer<typeof primaryPositionSchema>;
export type PlayerStatistics = z.infer<typeof playerStatisticsSchema>;
export type Player = z.infer<typeof playerSchema>;
export type TeamStatistics = z.infer<typeof teamStatisticsSchema>;
export type SummaryTeam = z.infer<typeof summaryTeamSchema>;
export type GameSummary = z.infer<typeof gameSummarySchema>;
