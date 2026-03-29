import { createClient } from "@supabase/supabase-js";
import {Database} from "../../database.types"

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL ?? "",
  process.env.REACT_APP_SUPABASE_ANON_KEY ?? "",
);
