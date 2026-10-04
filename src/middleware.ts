import { defineMiddleware } from "astro:middleware";
import { getLocaleFromUrl } from "@/core/i18n";
import { CmsUnavailableError } from "@/features/publication/cms-client";
import { loadPublication } from "@/features/publication/publication";

export const onRequest = defineMiddleware(async (context, next) => {
  if (
    context.url.pathname.startsWith("/cms-pilot/") ||
    context.url.pathname === "/robots.txt"
  ) {
    return next();
  }
  if (context.params.locale && !["es", "fr"].includes(context.params.locale)) {
    return new Response("Not found", { status: 404 });
  }
  try {
    context.locals.cmsPublication = await loadPublication(
      getLocaleFromUrl(context.url),
      import.meta.env.CMS_PUBLIC_API_ORIGIN || process.env.CMS_PUBLIC_API_ORIGIN,
    );
  } catch (error) {
    if (!(error instanceof CmsUnavailableError)) throw error;
    return new Response("Published content temporarily unavailable", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  return next();
});
