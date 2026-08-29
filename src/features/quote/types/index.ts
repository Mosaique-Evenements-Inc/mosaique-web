export type LeadRequest = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  eventType: string;
  eventDate: string | null;
  guestRange: string;
  preferredLanguage: string | null;
};

export type LeadCreated = {
  id: string;
  status: string;
  created_at: string;
};

export type CreateLeadResponse = {
  status: "created";
  lead: LeadCreated;
};

export type LeadApiError = {
  error: string;
  message: string;
  field?: string;
  status?: number;
};

export type LeadSubmissionStatus = "idle" | "submitting" | "success" | "error";

export type LeadFormInput = {
  [Field in keyof LeadRequest]?: unknown;
};

export type LeadValidationResult =
  { success: true; data: LeadRequest } | { success: false; error: LeadApiError };

export type LeadSubmissionResult =
  { success: true; lead: LeadCreated } | { success: false; error: LeadApiError };

export type QuoteSubmissionDetail = {
  fields: LeadFormInput;
  venueFiles: File[];
  resolve: () => void;
  reject: (error: LeadApiError) => void;
};
