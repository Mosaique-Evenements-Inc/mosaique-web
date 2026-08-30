import { getPublicSupabaseConfig } from "../../../core/config/env";
import type { CreateLeadResponse, LeadApiError } from "../types";
import { LeadRepositoryError, type LeadRepository } from "./lead.repository";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isCreateLeadResponse = (value: unknown): value is CreateLeadResponse => {
  if (!isRecord(value) || value.status !== "created" || !isRecord(value.lead)) return false;

  return (
    typeof value.lead.id === "string" &&
    typeof value.lead.status === "string" &&
    typeof value.lead.created_at === "string"
  );
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const getHttpError = (status: number, body: unknown): LeadApiError => {
  if (isRecord(body)) {
    return {
      error: typeof body.error === "string" ? body.error : "Request failed",
      message:
        typeof body.message === "string"
          ? body.message
          : `El servidor rechazó la solicitud (${status}).`,
      ...(typeof body.field === "string" ? { field: body.field } : {}),
      status,
    };
  }

  return {
    error: "Request failed",
    message: `El servidor rechazó la solicitud (${status}).`,
    status,
  };
};

const createLead: LeadRepository["create"] = async (payload) => {
  const { url: supabaseUrl, publishableKey } = getPublicSupabaseConfig();

  if (!supabaseUrl || !publishableKey) {
    throw new LeadRepositoryError({
      error: "Configuration error",
      message: "El transporte de solicitudes no está configurado.",
    });
  }

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl}/functions/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: publishableKey,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new LeadRepositoryError({
      error: "Network error",
      message: "No fue posible conectar con el servicio de solicitudes.",
    });
  }

  const body = await parseResponseBody(response);
  if (!response.ok) throw new LeadRepositoryError(getHttpError(response.status, body));

  if (response.status !== 201 || !isCreateLeadResponse(body)) {
    throw new LeadRepositoryError({
      error: "Invalid response",
      message: "El servicio devolvió una respuesta inesperada.",
      status: response.status,
    });
  }

  return body;
};

export const httpLeadRepository: LeadRepository = { create: createLead };
