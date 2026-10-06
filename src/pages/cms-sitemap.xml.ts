import type { APIRoute } from "astro";
import {
  getGalleryCategoryIds,
  getGalleryCategorySlug,
  getPublication,
} from "@/features/publication/publication";
import type { EventCategoryId } from "@/features/events";

export const GET: APIRoute = ({ locals, site }) => {
  if (!site) return new Response("Site origin unavailable", { status: 503 });
  // Slugs are publication-wide; the English DTO supplies them for all locale URLs.
  const publication = getPublication(locals, "en");
  const paths = [
    "/",
    "/about/",
    "/contact/",
    "/gallery/",
    "/tree/",
    ...publication.services.map((service) => `/services/${service.slug}/`),
    ...publication.events.map((event) => `/events/${event.slug}/`),
    ...getGalleryCategoryIds(publication).map(
      (category) => `/gallery/${getGalleryCategorySlug(category as EventCategoryId)}/`,
    ),
  ];
  const urls = ["", "es/", "fr/"].flatMap((prefix) =>
    paths.map((path) => new URL(`/${prefix}${path.slice(1)}`, site).href),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
