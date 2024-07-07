import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./model";
import { config_env } from "@/config/env_config";


const sql = neon(config_env.NEXT_PUBLIC_DRIZZLE_DB_URL);

export const db = drizzle(sql, { schema });

// const result = await db.select().from(...);
