import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const directives = ["User-agent: *", "Allow: /"];

  if (site) {
    directives.push(
      "",
      `Sitemap: ${new URL("sitemap-index.xml", site).href}`,
      `Sitemap: ${new URL("cms-sitemap.xml", site).href}`,
    );
  }

  return new Response(`${directives.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
