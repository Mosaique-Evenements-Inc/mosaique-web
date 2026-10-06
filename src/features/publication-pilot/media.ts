import celebrationsMain from "@/assets/images/services/celebrations/main.jpg";
import { nossaCopa92, nossaCopaMain } from "@/assets/images/events";

import type { MediaReference } from "./snapshot";

const assets = {
  "celebrations-main": {
    version: "8740e1701ce0dc134bf6d0994d458a4d14c325cf6075d012d06e1c19a2c3cbf0",
    src: celebrationsMain,
  },
  "nossa-copa-main": {
    version: "50153cdfa88f1495cb1f3d0e5c15c738c309f40b030aa8337bddb0e11c512ba8",
    src: nossaCopaMain,
  },
  "nossa-copa-92": {
    version: "9a73807a388933cf8800ae6cf959c0aa7de8e16bac3b05b9f7d6346900432c14",
    src: nossaCopa92,
  },
};

export const resolvePilotAsset = (reference: MediaReference) => {
  const asset = assets[reference.code as keyof typeof assets];
  if (!asset || asset.version !== reference.version) {
    throw new Error(`Pilot asset unavailable: ${reference.code}@${reference.version}`);
  }
  return asset.src;
};
