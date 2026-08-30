import { LeadRepositoryError, type LeadRepository } from "../repositories/lead.repository";
import type { CreateLeadResponse, LeadApiError, LeadRequest } from "../types";

export class LeadServiceError extends Error {
  readonly details: LeadApiError;

  constructor(details: LeadApiError) {
    super(details.message);
    this.name = "LeadServiceError";
    this.details = details;
  }
}

const normalizePayload = (payload: LeadRequest): LeadRequest => ({
  fullName: payload.fullName.trim(),
  email: payload.email.trim().toLowerCase(),
  phone: payload.phone.trim(),
  service: payload.service.trim(),
  eventType: payload.eventType.trim(),
  eventDate: payload.eventDate,
  guestRange: payload.guestRange.trim(),
  preferredLanguage: payload.preferredLanguage?.trim() || null,
});

export const createLead = async (
  repository: LeadRepository,
  payload: LeadRequest,
): Promise<CreateLeadResponse> => {
  try {
    return await repository.create(normalizePayload(payload));
  } catch (error) {
    if (error instanceof LeadRepositoryError) {
      throw new LeadServiceError(error.details);
    }

    throw new LeadServiceError({
      error: "Submission error",
      message: "No fue posible procesar la solicitud.",
    });
  }
};
