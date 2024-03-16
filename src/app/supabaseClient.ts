import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_API_KEY || "";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;