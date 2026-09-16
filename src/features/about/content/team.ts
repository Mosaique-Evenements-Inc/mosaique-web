import type { ImageMetadata } from "astro";

import christianGarcerant from "@/assets/images/about-us/our-team/christian-garcerant.jpg";
import cristianVargas from "@/assets/images/about-us/our-team/cristian-vargas.jpg";
import eliasBarrios from "@/assets/images/about-us/our-team/elias-barrios.jpg";
import patriciaRomero from "@/assets/images/about-us/our-team/patricia-romero.jpg";
import paulaContreras from "@/assets/images/about-us/our-team/paula-contreras.jpeg";
import sebastianCabarcas from "@/assets/images/about-us/our-team/sebastian-cabarcas.jpg";
import type { Locale } from "@/core/i18n";
import { getAboutTranslations } from "@/features/about/i18n";

export interface TeamMember {
  id: string;
  name: string;
  lastName: string;
  role: string;
  occupation: string;
  description: string;
  image?: ImageMetadata;
}

export interface TeamContent {
  eyebrow: string;
  heading: string;
  labels: {
    name: string;
    role: string;
    occupation: string;
  };
  members: readonly TeamMember[];
  selectedPrefix: string;
  selectMemberLabel: string;
}

export const TEAM_MEMBERS = [
  {
    id: "elias-barrios",
    name: "Elías Barrios",
    lastName: "Barrios",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
    image: eliasBarrios,
  },
  {
    id: "sebastian-cabarcas",
    name: "Sebastián Cabarcas",
    lastName: "Cabarcas",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
    image: sebastianCabarcas,
  },
  {
    id: "paula-contreras",
    name: "Paula Contreras",
    lastName: "Contreras",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
    image: paulaContreras,
  },
  {
    id: "christian-garcerant",
    name: "Christian Garcerant",
    lastName: "Garcerant",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
    image: christianGarcerant,
  },
  {
    id: "patricia-romero",
    name: "Patricia Romero",
    lastName: "Romero",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
    image: patriciaRomero,
  },
  {
    id: "christopher-salgado",
    name: "Christopher Salgado",
    lastName: "Salgado",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
  },
  {
    id: "cristian-vargas",
    name: "Cristian Vargas",
    lastName: "Vargas",
    role: "Cargo por definir",
    occupation: "Ocupación por definir",
    description: "Descripción del cargo por definir.",
    image: cristianVargas,
  },
] as const satisfies readonly TeamMember[];

export const getLocalizedTeamContent = (locale: Locale): TeamContent => {
  const team = getAboutTranslations(locale).team;

  return {
    eyebrow: team.eyebrow,
    heading: team.heading,
    labels: team.labels,
    selectedPrefix: team.selectedPrefix,
    selectMemberLabel: team.selectMemberLabel,
    members: TEAM_MEMBERS.map((member) => ({
      ...member,
      role: team.placeholder.role,
      occupation: team.placeholder.occupation,
      description: team.placeholder.description,
    })),
  };
};
