export const getPublicSupabaseConfig = () => ({
  url: import.meta.env.PUBLIC_SUPABASE_URL,
  publishableKey: import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});
