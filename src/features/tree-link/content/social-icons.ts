import { siFacebook, siInstagram, siTiktok } from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type TreeLinkSocialIconSlug = "instagram" | "facebook" | "tiktok";

export const TREE_LINK_SOCIAL_CARD_BG = "#F9EBE0";

export const TREE_LINK_SOCIAL_ICONS: Record<TreeLinkSocialIconSlug, SimpleIcon> = {
  instagram: siInstagram,
  facebook: siFacebook,
  tiktok: siTiktok,
};

export const TREE_LINK_INSTAGRAM_GRADIENT_STOPS = [
  { offset: "0%", color: "#FCAF45" },
  { offset: "32%", color: "#F77737" },
  { offset: "58%", color: "#E1306C" },
  { offset: "100%", color: "#833AB4" },
] as const;
