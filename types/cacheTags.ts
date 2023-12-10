import z from "zod";

const cacheTagSchema = z.literal("dailySchedule").or(z.literal("boxScore"))


export type CacheTag = z.infer<typeof cacheTagSchema>;
export {cacheTagSchema}