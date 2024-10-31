import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: import.meta.env.REDIS_URL,
  token: import.meta.env.REDIS_TOKEN,
}) as any;
