import { useCallback } from "react";

import { LeadServiceError } from "../services/leads.service";
import { submitLead as submitLeadRequest } from "../submit-lead";
import { useLeadsStore } from "../stores/leads.store";
import type { LeadApiError, LeadFormInput, LeadSubmissionResult } from "../types";
import { validateLeadPayload } from "../validators/leads";

const unknownSubmissionError: LeadApiError = {
  error: "Submission error",
  message: "No fue posible enviar la solicitud.",
};

export const useLeadSubmission = () => {
  const status = useLeadsStore((state) => state.status);
  const error = useLeadsStore((state) => state.error);
  const createdLead = useLeadsStore((state) => state.createdLead);
  const setSubmitting = useLeadsStore((state) => state.setSubmitting);
  const setSuccess = useLeadsStore((state) => state.setSuccess);
  const setError = useLeadsStore((state) => state.setError);
  const reset = useLeadsStore((state) => state.reset);

  const submitLead = useCallback(
    async (input: LeadFormInput): Promise<LeadSubmissionResult> => {
      const validation = validateLeadPayload(input);
      if (!validation.success) {
        setError(validation.error);
        return validation;
      }

      setSubmitting();
      try {
        const response = await submitLeadRequest(validation.data);
        setSuccess(response.lead);
        return { success: true, lead: response.lead };
      } catch (caughtError) {
        const submissionError =
          caughtError instanceof LeadServiceError
            ? caughtError.details
            : unknownSubmissionError;
        setError(submissionError);
        return { success: false, error: submissionError };
      }
    },
    [setError, setSubmitting, setSuccess],
  );

  return {
    submitLead,
    reset,
    status,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    isError: status === "error",
    error,
    createdLead,
  };
};
