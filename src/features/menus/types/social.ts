export const MENU_SOCIAL_PLATFORMS = ["instagram", "tiktok", "facebook"] as const;

export type MenuSocialPlatform = (typeof MENU_SOCIAL_PLATFORMS)[number];

export interface MenuSocialLink {
  platform: MenuSocialPlatform;
  /** Canonical account handle without @; presentation may add it. */
  handle: string;
  /** Complete HTTPS destination, stored independently of the handle. */
  url: string;
}
