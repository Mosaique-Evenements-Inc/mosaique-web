import { create } from "zustand";

import type { LeadApiError, LeadCreated, LeadSubmissionStatus } from "../types/leads";

type LeadsState = {
  status: LeadSubmissionStatus;
  error: LeadApiError | null;
  createdLead: LeadCreated | null;
  setSubmitting: () => void;
  setSuccess: (lead: LeadCreated) => void;
  setError: (error: LeadApiError) => void;
  reset: () => void;
};

const initialState = {
  status: "idle" as const,
  error: null,
  createdLead: null,
};

export const useLeadsStore = create<LeadsState>((set) => ({
  ...initialState,
  setSubmitting: () => set({ status: "submitting", error: null, createdLead: null }),
  setSuccess: (createdLead) => set({ status: "success", error: null, createdLead }),
  setError: (error) => set({ status: "error", error, createdLead: null }),
  reset: () => set(initialState),
}));
