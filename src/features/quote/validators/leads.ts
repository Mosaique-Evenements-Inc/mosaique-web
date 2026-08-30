import type { LeadApiError, LeadFormInput, LeadRequest, LeadValidationResult } from "../types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const validationError = (field: keyof LeadRequest, message: string): LeadApiError => ({
  error: "Validation error",
  field,
  message,
});

const getString = (input: LeadFormInput, field: keyof LeadRequest) => {
  const value = input[field];
  return typeof value === "string" ? value.trim() : "";
};

const isValidIsoDate = (value: string) => {
  if (!isoDatePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

export const validateFullName = (value: string) => value.trim().length > 0;
export const validateEmail = (value: string) => emailPattern.test(value.trim());
export const validatePhone = (value: string) => /^\d{7,10}$/.test(value.trim());
export const validateRequiredSelection = (value: string) => value.trim().length > 0;
export const validateEventDate = (value: string | null) =>
  value === null || isValidIsoDate(value);

export const validateLeadPayload = (input: LeadFormInput): LeadValidationResult => {
  const fullName = getString(input, "fullName");
  if (!validateFullName(fullName)) {
    return {
      success: false,
      error: validationError("fullName", "Ingresa tu nombre completo."),
    };
  }

  const email = getString(input, "email");
  if (!validateEmail(email)) {
    return { success: false, error: validationError("email", "Ingresa un email válido.") };
  }

  const phone = getString(input, "phone");
  if (!validatePhone(phone)) {
    return { success: false, error: validationError("phone", "Ingresa un teléfono válido.") };
  }

  const service = getString(input, "service");
  if (!validateRequiredSelection(service)) {
    return { success: false, error: validationError("service", "Selecciona un servicio.") };
  }

  const eventType = getString(input, "eventType");
  if (!validateRequiredSelection(eventType)) {
    return {
      success: false,
      error: validationError("eventType", "Selecciona el tipo de evento."),
    };
  }

  const guestRange = getString(input, "guestRange");
  if (!validateRequiredSelection(guestRange)) {
    return {
      success: false,
      error: validationError("guestRange", "Selecciona un rango de invitados."),
    };
  }

  const rawEventDate = input.eventDate;
  const eventDate = rawEventDate === null || rawEventDate === "" ? null : rawEventDate;
  if (typeof eventDate !== "string" && eventDate !== null) {
    return {
      success: false,
      error: validationError("eventDate", "Revisa la fecha del evento."),
    };
  }
  if (!validateEventDate(eventDate)) {
    return {
      success: false,
      error: validationError("eventDate", "Usa una fecha válida con formato YYYY-MM-DD."),
    };
  }

  const rawPreferredLanguage = input.preferredLanguage;
  const preferredLanguage =
    rawPreferredLanguage === null ||
    rawPreferredLanguage === undefined ||
    rawPreferredLanguage === ""
      ? null
      : rawPreferredLanguage;
  if (typeof preferredLanguage !== "string" && preferredLanguage !== null) {
    return {
      success: false,
      error: validationError("preferredLanguage", "Revisa el idioma de preferencia."),
    };
  }

  return {
    success: true,
    data: {
      fullName,
      email,
      phone: `+1${phone}`,
      service,
      eventType,
      eventDate,
      guestRange,
      preferredLanguage: preferredLanguage?.trim() || null,
    },
  };
};
