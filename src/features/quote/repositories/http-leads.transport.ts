import type { CreateLeadResponse } from "../types";
import {
  isCreateLeadResponse,
  networkLeadError,
  parseLeadApiError,
  timeoutLeadError,
} from "../contracts/public-lead-capture.ts";
import { LeadRepositoryError, type LeadRepository } from "./lead.repository.ts";

export type PublicLeadTransportConfig = {
  url: string | undefined;
  publishableKey: string | undefined;
};

type PublicLeadTransportOptions = {
  getConfig: () => PublicLeadTransportConfig;
  fetcher?: typeof fetch;
  timeoutMs?: number;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const createHttpLeadRepository = ({
  getConfig,
  fetcher = fetch,
  timeoutMs = 12_000,
}: PublicLeadTransportOptions): LeadRepository => ({
  create: async (payload): Promise<CreateLeadResponse> => {
    const { url, publishableKey } = getConfig();

    if (!url || !publishableKey) {
      throw new LeadRepositoryError({
        error: "Configuration error",
        message: "El transporte de solicitudes no está configurado.",
        retryable: false,
      });
    }

    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetcher(`${url}/functions/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: publishableKey,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (error) {
      throw new LeadRepositoryError(
        error instanceof DOMException && error.name === "AbortError"
          ? timeoutLeadError
          : networkLeadError,
      );
    } finally {
      globalThis.clearTimeout(timeout);
    }

    const body = await parseResponseBody(response);
    if (!response.ok) throw new LeadRepositoryError(parseLeadApiError(response.status, body));

    if (response.status !== 201 || !isCreateLeadResponse(body)) {
      throw new LeadRepositoryError({
        error: "Invalid response",
        message: "El servicio devolvió una respuesta inesperada.",
        status: response.status,
        retryable: true,
      });
    }

    return body;
  },
});
