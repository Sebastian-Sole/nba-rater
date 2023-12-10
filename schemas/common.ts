import { z } from "zod";

export const timeZonesSchema = z.object({
  venue: z.string(),
  home: z.string(),
  away: z.string(),
});

export const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  sr_id: z.string(),
});

export const leagueSchema = z.object({
  id: z.string(),
  name: z.string(),
  alias: z.string(),
});

export type TimeZones = z.infer<typeof timeZonesSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type League = z.infer<typeof leagueSchema>;
