// @ts-check
import { defineConfig, envField } from "astro/config";
import process from "node:process";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
const site = process.env.SITE_URL;

export default defineConfig({
  site,
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: "client", access: "public", optional: true }),
      SUPABASE_PUBLISHABLE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  i18n: {
    locales: [
      "es",
      { path: "en", codes: ["en", "en-CA"] },
      { path: "fr", codes: ["fr", "fr-CA"] },
    ],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), ...(site ? [sitemap()] : [])],
  vite: {
    plugins: [tailwindcss()],
    resolve: { dedupe: ["react", "react-dom"] },
  },
});
