import type { ImageMetadata } from "astro";

import collaboratorGarcerant from "../../assets/logos/collaboraters/logo_sra_garcerant.png";
import collaboratorPharus from "../../assets/logos/collaboraters/MONOGRAMA PHARUS (3).png";
import collaboratorMicroverse from "../../assets/logos/collaboraters/Logo blanco sin fondo.png";

export interface Collaborator {
  image: ImageMetadata;
  link: string;
  nombre: string;
  path: string;
  proportion: "landscape" | "portrait" | "monogram";
}

export const collaborators = [
  {
    nombre: "Sra. Garcerant",
    link: "https://paula-contreras.vercel.app/tree",
    image: collaboratorGarcerant,
    path: collaboratorGarcerant.src,
    proportion: "landscape",
  },
  {
    nombre: "Pharus Creative",
    link: "https://pharuscreative.com/",
    image: collaboratorPharus,
    path: collaboratorPharus.src,
    proportion: "portrait",
  },
  {
    nombre: "Microverse Solution",
    link: "https://microversesolution.com/",
    image: collaboratorMicroverse,
    path: collaboratorMicroverse.src,
    proportion: "monogram",
  },
] satisfies readonly Collaborator[];
