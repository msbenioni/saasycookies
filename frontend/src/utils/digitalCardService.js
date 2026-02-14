const jsonHeaders = { "Content-Type": "application/json" };

async function handleResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }

  return payload;
}

export async function createDigitalCardCheckout(cardPayload) {
  const response = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(cardPayload),
  });

  return handleResponse(response);
}

export async function fetchDigitalCardBySlug(slug) {
  const response = await fetch(
    `/.netlify/functions/get-card-by-slug?slug=${encodeURIComponent(slug)}`
  );

  return handleResponse(response);
}

export async function fetchDigitalCardByToken(token) {
  const response = await fetch(
    `/.netlify/functions/get-card-by-token?token=${encodeURIComponent(token)}`
  );

  return handleResponse(response);
}

export async function updateDigitalCardByToken(token, cardJson) {
  const response = await fetch("/.netlify/functions/update-card-by-token", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ token, cardJson }),
  });

  return handleResponse(response);
}

export async function fetchDigitalCardStatus(cardId) {
  const response = await fetch(
    `/.netlify/functions/get-card-status?cardId=${encodeURIComponent(cardId)}`
  );

  return handleResponse(response);
}

export async function requestSignedUpload(cardId, filename, contentType) {
  const response = await fetch("/.netlify/functions/sign-upload", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ cardId, filename, contentType }),
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

export function buildPublicAssetUrl(path) {
  const base = process.env.REACT_APP_SUPABASE_URL;

  if (!base) {
    throw new Error("Missing REACT_APP_SUPABASE_URL");
  }

  return `${base}/storage/v1/object/public/digital-card-assets/${path}`;
}

export function buildVcf(cardJson) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${cardJson.name || ""}`,
    `ORG:${cardJson.company || ""}`,
    cardJson.phone ? `TEL;TYPE=CELL:${cardJson.phone}` : "",
    cardJson.email ? `EMAIL;TYPE=INTERNET:${cardJson.email}` : "",
    cardJson.website ? `URL:${cardJson.website}` : "",
    "END:VCARD",
  ].filter(Boolean);

  return lines.join("\n");
}
