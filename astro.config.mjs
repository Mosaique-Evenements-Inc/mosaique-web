// @ts-check
import { defineConfig, envField } from "astro/config";
import process from "node:process";
import { URL } from "node:url";

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
    locales: ["en", { path: "es", codes: ["es"] }, { path: "fr", codes: ["fr", "fr-CA"] }],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    ...(site
      ? [
          sitemap({
            filter: (page) => !/^\/(?:es\/|fr\/)?404\/?$/.test(new URL(page).pathname),
            i18n: {
              defaultLocale: "en",
              locales: {
                en: "en-CA",
                es: "es",
                fr: "fr-CA",
              },
            },
          }),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: { dedupe: ["react", "react-dom"] },
  },
});
