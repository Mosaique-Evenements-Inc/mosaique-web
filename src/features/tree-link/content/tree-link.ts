import { collaborators as footerCollaborators } from "@/features/site-shell/content/collaborators";
import type { TreeLinkSocialIconSlug } from "./social-icons";

export type TreeLinkSocialId = TreeLinkSocialIconSlug;
export type TreeLinkCollaborator = (typeof footerCollaborators)[number];
export type TreeLinkCollaboratorName = TreeLinkCollaborator["nombre"];

export interface TreeLinkSocial {
  id: TreeLinkSocialId;
  label: "Instagram" | "TikTok" | "Facebook";
  url: string | null;
}

export interface TreeLinkEventSlot {
  id: `event-slot-${string}`;
  status: "pending";
}

export const treeLinkContent = {
  brand: {
    name: "MOSAÏQUE",
    qualifier: "ÉVÉNEMENTS",
    location: "Montréal, Québec",
  },
  website: {
    href: "/",
  },
  agenda: {
    slots: [
      { id: "event-slot-01", status: "pending" },
      { id: "event-slot-02", status: "pending" },
      { id: "event-slot-03", status: "pending" },
    ] satisfies readonly TreeLinkEventSlot[],
  },
  socials: [
    { id: "instagram", label: "Instagram", url: null },
    { id: "tiktok", label: "TikTok", url: null },
    { id: "facebook", label: "Facebook", url: null },
  ] satisfies readonly TreeLinkSocial[],
  collaborators: footerCollaborators,
} as const;
