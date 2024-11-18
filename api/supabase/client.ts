import { createClient } from "@supabase/supabase-js";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env_vars = await load({ envPath: "./.env" });

export const supabase = createClient(
    env_vars.SUP_URL,
    env_vars.SUP_KEY
);
