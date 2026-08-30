import { useEffect } from "react";

import { useLeadSubmission } from "../../hooks/useLeadSubmission";
import type { QuoteSubmissionDetail } from "../../types";

const isQuoteSubmissionDetail = (value: unknown): value is QuoteSubmissionDetail => {
  if (typeof value !== "object" || value === null) return false;
  const detail = value as Record<string, unknown>;
  return (
    typeof detail.fields === "object" &&
    detail.fields !== null &&
    Array.isArray(detail.venueFiles) &&
    typeof detail.resolve === "function" &&
    typeof detail.reject === "function"
  );
};

export default function LeadSubmissionTransport() {
  const { submitLead } = useLeadSubmission();

  useEffect(() => {
    const handleSubmission = (event: Event) => {
      if (!(event instanceof CustomEvent) || !isQuoteSubmissionDetail(event.detail)) return;
      event.preventDefault();

      const { fields, resolve, reject } = event.detail;
      void submitLead(fields).then((result) => {
        if (result.success) resolve();
        else reject(result.error);
      });
    };

    document.addEventListener("quote:submit-request", handleSubmission);
    return () => document.removeEventListener("quote:submit-request", handleSubmission);
  }, [submitLead]);

  return null;
}
