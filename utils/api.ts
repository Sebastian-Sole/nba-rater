"use server";
import { revalidateTag } from "next/cache";

const access_level = "trial";
const version = "v7";
const language_code = "en";
const SPORTRADAR_API_KEY = process.env.SPORTRADAR_API_KEY;

type Date = {
  year: string;
  month: string;
  day: string;
};
export const getDailyScheduleApiUrl = ({ year, month, day }: Date) => {
  return `https://api.sportradar.com/nba/${access_level}/${version}/${language_code}/games/${year}/${month}/${day}/schedule.json?api_key=${SPORTRADAR_API_KEY}`;
};

export const getGameSummaryApiUrl = (gameId: string) => {
  return `https://api.sportradar.com/nba/${access_level}/${version}/${language_code}/games/${gameId}/summary.json?api_key=${SPORTRADAR_API_KEY}`;
};

export default async function revalidateCache(tag: string) {
  revalidateTag(tag);
  console.log("revalidated cache");
}
