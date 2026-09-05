import type { CreateLeadResponse, LeadApiError, LeadRequest } from "../types";

export const publicLeadRequestFields = [
  "fullName",
  "email",
  "phone",
  "service",
  "eventType",
  "eventDate",
  "guestRange",
  "preferredLanguage",
] as const satisfies readonly (keyof LeadRequest)[];

export const publicLeadFieldLimits = {
  fullName: 200,
  email: 320,
  phone: 32,
  service: 100,
  eventType: 120,
  eventDate: 10,
  guestRange: 100,
  preferredLanguage: 35,
} as const satisfies Record<keyof LeadRequest, number>;

export const publicLeadCreatedStatus = "NEW" as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const leadCodePattern = /^LEA-[0-9]{8}$/;

const isIsoTimestamp = (value: string) => !Number.isNaN(Date.parse(value));

export const isCreateLeadResponse = (value: unknown): value is CreateLeadResponse => {
  if (!isRecord(value) || value.status !== "created" || !isRecord(value.lead)) return false;

  return (
    typeof value.lead.code === "string" &&
    leadCodePattern.test(value.lead.code) &&
    value.lead.status === publicLeadCreatedStatus &&
    typeof value.lead.createdAt === "string" &&
    isIsoTimestamp(value.lead.createdAt)
  );
};

const fieldMessages = {
  fullName: "Revisa tu nombre completo.",
  email: "Revisa tu email.",
  phone: "Revisa tu teléfono.",
  service: "Selecciona un servicio válido.",
  eventType: "Selecciona un tipo de evento válido.",
  eventDate: "Revisa la fecha del evento.",
  guestRange: "Selecciona un rango de invitados válido.",
  preferredLanguage: "Revisa el idioma de preferencia.",
} as const satisfies Record<keyof LeadRequest, string>;

const statusMessages: Record<number, string> = {
  400: "La solicitud no pudo procesarse. Revisa la información e inténtalo de nuevo.",
  413: "La solicitud es demasiado grande. Reduce la información adjunta e inténtalo de nuevo.",
  422: "Revisa la información marcada e inténtalo de nuevo.",
  500: "No fue posible procesar la solicitud en este momento. Inténtalo de nuevo.",
};

export const unknownLeadError: LeadApiError = {
  error: "Request failed",
  message: "No fue posible procesar la solicitud en este momento. Inténtalo de nuevo.",
  retryable: true,
};

export const networkLeadError: LeadApiError = {
  error: "Network error",
  message: "No fue posible conectar con el servicio de solicitudes. Inténtalo de nuevo.",
  retryable: true,
};

export const timeoutLeadError: LeadApiError = {
  error: "Timeout",
  message: "La solicitud tardó demasiado. Inténtalo de nuevo.",
  retryable: true,
};

export const parseLeadApiError = (status: number, body: unknown): LeadApiError => {
  const fallbackMessage = statusMessages[status] ?? unknownLeadError.message;
  const fallbackError =
    status === 413 || status === 422 ? "Validation error" : "Request failed";

  if (!isRecord(body) || !isRecord(body.error)) {
    return { error: fallbackError, message: fallbackMessage, status, retryable: status >= 500 };
  }

  const error = body.error;
  const details = isRecord(error.details) ? error.details : null;
  const field =
    details && typeof details.field === "string" && details.field in fieldMessages
      ? (details.field as keyof LeadRequest)
      : undefined;

  return {
    error: typeof error.code === "string" ? error.code : fallbackError,
    message: field ? fieldMessages[field] : fallbackMessage,
    ...(field ? { field } : {}),
    ...(typeof error.requestId === "string" ? { requestId: error.requestId } : {}),
    status,
    retryable: status >= 500,
  };
};
