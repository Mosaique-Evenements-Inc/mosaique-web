// @ts-check
import { defineConfig } from "astro/config";
import process from "node:process";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
const site = process.env.SITE_URL;

export default defineConfig({
  site,
  integrations: [react(), ...(site ? [sitemap()] : [])],
  vite: {
    plugins: [tailwindcss()],
    resolve: { dedupe: ["react", "react-dom"] },
  },
});
