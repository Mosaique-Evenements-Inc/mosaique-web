import { httpLeadRepository } from "./repositories/http-leads.repository";
import { createLead } from "./services/leads.service";
import type { LeadRequest } from "./types";

export const submitLead = (payload: LeadRequest) => createLead(httpLeadRepository, payload);
