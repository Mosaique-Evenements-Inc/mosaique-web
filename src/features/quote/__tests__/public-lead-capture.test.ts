import assert from "node:assert/strict";
import test from "node:test";

import {
  isCreateLeadResponse,
  parseLeadApiError,
  publicLeadCreatedStatus,
  publicLeadRequestFields,
} from "../contracts/public-lead-capture.ts";
import { LeadRepositoryError } from "../repositories/lead.repository.ts";
import { createHttpLeadRepository } from "../repositories/http-leads.transport.ts";
import { validateLeadPayload } from "../validators/leads.ts";

const validInput = {
  fullName: "  Patricia Romero  ",
  email: "  PATRICIA@EXAMPLE.COM  ",
  phone: "5145550100",
  service: "  bodas  ",
  eventType: "  boda  ",
  eventDate: " 2028-02-29 ",
  guestRange: " 51-100 ",
  preferredLanguage: " ES ",
  source: "WEBSITE",
  status: "NEW",
  code: "LEA-00000013",
  id: "private-id",
  budget: "10000",
};

const canonicalSuccess = {
  status: "created",
  lead: {
    code: "LEA-00000013",
    status: publicLeadCreatedStatus,
    createdAt: "2026-09-05T12:00:00.000Z",
  },
};

const createRepository = (fetcher: typeof fetch, timeoutMs?: number) =>
  createHttpLeadRepository({
    getConfig: () => ({ url: "https://api.example.test", publishableKey: "public-key" }),
    fetcher,
    timeoutMs,
  });

test("public request validation emits exactly the eight allowed fields", () => {
  const result = validateLeadPayload(validInput);

  assert.equal(result.success, true);
  if (!result.success) return;

  assert.deepEqual(Object.keys(result.data), publicLeadRequestFields);
  assert.equal(result.data.fullName, "Patricia Romero");
  assert.equal(result.data.email, "patricia@example.com");
  assert.equal(result.data.phone, "+15145550100");
  assert.equal(result.data.eventDate, "2028-02-29");
  assert.equal(result.data.preferredLanguage, "es");
  assert.equal("source" in result.data, false);
  assert.equal("status" in result.data, false);
  assert.equal("code" in result.data, false);
  assert.equal("id" in result.data, false);
  assert.equal("budget" in result.data, false);
});

test("optional event date is serialized as null", () => {
  const result = validateLeadPayload({ ...validInput, eventDate: "" });

  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.eventDate, null);
});

test("impossible calendar dates fail before submission", () => {
  const result = validateLeadPayload({ ...validInput, eventDate: "2027-02-29" });

  assert.equal(result.success, false);
  if (!result.success) assert.equal(result.error.field, "eventDate");
});

test("canonical success consumes lead.code and lead.createdAt without legacy aliases", async () => {
  let submittedBody: Record<string, unknown> | null = null;
  const repository = createRepository(async (_url, init) => {
    submittedBody = JSON.parse(String(init?.body));
    return Response.json(canonicalSuccess, { status: 201 });
  });

  const result = validateLeadPayload(validInput);
  assert.equal(result.success, true);
  if (!result.success) return;

  const response = await repository.create(result.data);

  assert.equal(response.lead.code, "LEA-00000013");
  assert.equal(response.lead.createdAt, "2026-09-05T12:00:00.000Z");
  assert.equal(response.lead.status, "NEW");
  assert.equal("id" in response.lead, false);
  assert.equal("created_at" in response.lead, false);
  assert.deepEqual(Object.keys(submittedBody ?? {}), publicLeadRequestFields);
});

test("success validation rejects legacy-alias-only and malformed responses", () => {
  assert.equal(isCreateLeadResponse(canonicalSuccess), true);
  assert.equal(
    isCreateLeadResponse({
      status: "created",
      lead: {
        id: "LEA-00000013",
        status: "NEW",
        created_at: "2026-09-05T12:00:00.000Z",
      },
    }),
    false,
  );
  assert.equal(
    isCreateLeadResponse({
      status: "created",
      lead: {
        code: "550e8400-e29b-41d4-a716-446655440000",
        status: "NEW",
        createdAt: "2026-09-05T12:00:00.000Z",
      },
    }),
    false,
  );
  assert.equal(
    isCreateLeadResponse({ status: "created", lead: { ...canonicalSuccess.lead } }),
    true,
  );
});

test("malformed successful HTTP response fails safely", async () => {
  const repository = createRepository(async () =>
    Response.json(
      { status: "created", lead: { ...canonicalSuccess.lead, createdAt: null } },
      {
        status: 201,
      },
    ),
  );
  const request = validateLeadPayload(validInput);
  assert.equal(request.success, true);
  if (!request.success) return;

  await assert.rejects(
    repository.create(request.data),
    (error) =>
      error instanceof LeadRepositoryError &&
      error.details.error === "Invalid response" &&
      error.details.retryable === true,
  );
});

test("canonical HTTP errors are mapped to safe feedback", () => {
  const envelope = (message: string, details: Record<string, unknown> | null = null) => ({
    error: {
      code: "VALIDATION_ERROR",
      message,
      details,
      requestId: "request-id",
    },
  });

  assert.deepEqual(parseLeadApiError(400, envelope("Invalid JSON body")), {
    error: "VALIDATION_ERROR",
    message: "La solicitud no pudo procesarse. Revisa la información e inténtalo de nuevo.",
    requestId: "request-id",
    status: 400,
    retryable: false,
  });
  assert.deepEqual(parseLeadApiError(413, envelope("Request body is too large")), {
    error: "VALIDATION_ERROR",
    message:
      "La solicitud es demasiado grande. Reduce la información adjunta e inténtalo de nuevo.",
    requestId: "request-id",
    status: 413,
    retryable: false,
  });
  assert.deepEqual(
    parseLeadApiError(422, envelope("Invalid email format", { field: "email" })),
    {
      error: "VALIDATION_ERROR",
      field: "email",
      message: "Revisa tu email.",
      requestId: "request-id",
      status: 422,
      retryable: false,
    },
  );
  assert.deepEqual(parseLeadApiError(500, envelope("Internal server error")), {
    error: "VALIDATION_ERROR",
    message: "No fue posible procesar la solicitud en este momento. Inténtalo de nuevo.",
    requestId: "request-id",
    status: 500,
    retryable: true,
  });
  assert.deepEqual(parseLeadApiError(422, { message: "private backend detail" }), {
    error: "Validation error",
    message: "Revisa la información marcada e inténtalo de nuevo.",
    status: 422,
    retryable: false,
  });
});

test("network failure and timeout produce retryable safe errors", async () => {
  const request = validateLeadPayload(validInput);
  assert.equal(request.success, true);
  if (!request.success) return;

  await assert.rejects(
    createRepository(async () => {
      throw new Error("private network detail");
    }).create(request.data),
    (error) =>
      error instanceof LeadRepositoryError &&
      error.details.error === "Network error" &&
      error.details.retryable === true,
  );

  await assert.rejects(
    createRepository(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError")),
          );
        }),
      1,
    ).create(request.data),
    (error) =>
      error instanceof LeadRepositoryError &&
      error.details.error === "Timeout" &&
      error.details.retryable === true,
  );
});
