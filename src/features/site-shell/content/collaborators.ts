import type { ImageMetadata } from "astro";

import collaboratorPc from "@/assets/logos/collaboraters/logo_pc.png";
import collaboratorPharus from "@/assets/logos/collaboraters/logo_pharus.png";
import collaboratorMicroverse from "@/assets/logos/collaboraters/logo_microverse.png";
import collaboratorLatinova from "@/assets/logos/collaboraters/logo_latinova.svg";

export interface Collaborator {
  image: ImageMetadata;
  link?: string;
  nombre: string;
  path: string;
  proportion: "landscape" | "portrait" | "monogram" | "wordmark";
}

export const collaborators = [
  {
    nombre: "Hey PC",
    link: "https://paula-contreras.vercel.app/tree",
    image: collaboratorPc,
    path: collaboratorPc.src,
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
  {
    nombre: "Latinova",
    link: "https://www.latinovamenage.com/",
    image: collaboratorLatinova,
    path: collaboratorLatinova.src,
    proportion: "wordmark",
  },
] satisfies readonly Collaborator[];
