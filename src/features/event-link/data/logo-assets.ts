import aoaLogo from "@/assets/logos/events/aoa_logo.svg";
import mosaiqueLogo from "@/assets/logos/mosaique_logo_complete.png";
import type { StaticImageSource } from "@/core/common/types/media";

export const eventLinkLogoAssets = {
  aoa: aoaLogo,
  "mosaique-complete": mosaiqueLogo,
} satisfies Record<"aoa" | "mosaique-complete", StaticImageSource>;
