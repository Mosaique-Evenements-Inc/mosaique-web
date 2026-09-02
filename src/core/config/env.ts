import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "astro:env/client";

export const getPublicSupabaseConfig = () => ({
  url: SUPABASE_URL,
  publishableKey: SUPABASE_PUBLISHABLE_KEY,
});
