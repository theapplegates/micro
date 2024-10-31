import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(import.meta.env.DB_URL);

export const db = drizzle(sql, {
  schema,
});
