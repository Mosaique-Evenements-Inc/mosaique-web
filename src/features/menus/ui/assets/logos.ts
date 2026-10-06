import type { ImageMetadata } from "astro";

import aoaLogo from "@/assets/logos/events/aoa_logo.svg";
import type { MenuLogoAssetId } from "../../types";

export const menuLogoAssets = {
  aoa: aoaLogo,
} satisfies Record<MenuLogoAssetId, ImageMetadata>;
