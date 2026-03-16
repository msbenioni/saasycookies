const jsonHeaders = { "Content-Type": "application/json" };

async function handleResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || payload.details || "Request failed");
  }

  return payload;
}

export async function createAuditCheckout(payload) {
  const response = await fetch("/.netlify/functions/create-audit-checkout", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function fetchAuditRequestBySession(sessionId) {
  const response = await fetch(
    `/.netlify/functions/get-audit-request?checkout_session_id=${encodeURIComponent(sessionId)}`
  );

  return handleResponse(response);
}

export async function createAuditSession(payload) {
  const response = await fetch("/.netlify/functions/create-audit-session", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function fetchAuditSession(sessionId, resumeToken) {
  const response = await fetch(
    `/.netlify/functions/get-audit-session?session_id=${encodeURIComponent(sessionId)}&token=${encodeURIComponent(
      resumeToken || ""
    )}`
  );

  return handleResponse(response);
}

export async function updateAuditSession(payload) {
  const response = await fetch("/.netlify/functions/update-audit-session", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function requestAuditUpload(auditRequestId, filename, contentType) {
  const response = await fetch("/.netlify/functions/sign-audit-upload", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ auditRequestId, filename, contentType }),
  });

  return handleResponse(response);
}

export async function finalizeAuditUpload(payload) {
  const response = await fetch("/.netlify/functions/mark-audit-upload", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function uploadFileToSignedUrl(signedUrl, file) {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }
}

export function buildAuditAssetUrl(path) {
  const base = process.env.REACT_APP_SUPABASE_URL;

  if (!base) {
    throw new Error("Missing REACT_APP_SUPABASE_URL");
  }

  return `${base}/storage/v1/object/public/audit-uploads/${path}`;
}
