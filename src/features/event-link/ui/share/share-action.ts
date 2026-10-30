import type { SharePayload } from "../../types/index.ts";

export type ShareProvider = "x" | "facebook" | "whatsapp" | "linkedin" | "email";

export function isShareCancellation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}

export function resolveSharePayload(payload: SharePayload, origin: string): SharePayload {
  return { ...payload, url: new URL(payload.url, origin).href };
}

export function getShareProviderUrl(provider: ShareProvider, payload: SharePayload): string {
  const message = [
    payload.title,
    payload.text,
    ...(payload.text.includes(payload.url) ? [] : [payload.url]),
  ].join("\n");
  const params = new URLSearchParams();

  switch (provider) {
    case "x":
      params.set("text", message);
      return `https://twitter.com/intent/tweet?${params}`;
    case "facebook":
      params.set("u", payload.url);
      return `https://www.facebook.com/sharer/sharer.php?${params}`;
    case "whatsapp":
      params.set("text", message);
      return `https://api.whatsapp.com/send?${params}`;
    case "linkedin":
      params.set("url", payload.url);
      return `https://www.linkedin.com/sharing/share-offsite/?${params}`;
    case "email":
      params.set("subject", payload.title);
      params.set("body", message);
      return `mailto:?${params}`;
  }
}
