import { getPublicSupabaseConfig } from "../../../core/config/env";
import { createHttpLeadRepository } from "./http-leads.transport";

export const httpLeadRepository = createHttpLeadRepository({
  getConfig: getPublicSupabaseConfig,
});
