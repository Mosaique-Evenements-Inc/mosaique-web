import type { CreateLeadResponse, LeadApiError, LeadRequest } from "../types";

export type LeadRepository = {
  create: (payload: LeadRequest) => Promise<CreateLeadResponse>;
};

export class LeadRepositoryError extends Error {
  readonly details: LeadApiError;

  constructor(details: LeadApiError) {
    super(details.message);
    this.name = "LeadRepositoryError";
    this.details = details;
  }
}
