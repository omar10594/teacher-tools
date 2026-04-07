import { createHmac, timingSafeEqual } from "crypto";

export const AUTH_SESSION_COOKIE = "teacher_tools_session";

type AuthTokenType = "magic" | "session";

type AuthTokenPayload = {
  type: AuthTokenType;
  email: string;
  exp: number;
};

type Session = {
  email: string;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.");
  }
  return secret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(data: string, secret: string) {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

function parseToken(token: string, expectedType: AuthTokenType): AuthTokenPayload | null {
  const [encodedPayload, providedSignature] = token.split(".");
  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const secret = getAuthSecret();
  const expectedSignature = sign(encodedPayload, secret);

  const a = Buffer.from(providedSignature, "utf8");
  const b = Buffer.from(expectedSignature, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AuthTokenPayload;
    if (payload.type !== expectedType) {
      return null;
    }
    if (!payload.email || typeof payload.email !== "string") {
      return null;
    }
    if (!payload.exp || typeof payload.exp !== "number") {
      return null;
    }
    if (Date.now() >= payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function createAuthToken(
  type: AuthTokenType,
  email: string,
  expiresInSeconds: number,
) {
  const payload: AuthTokenPayload = {
    type,
    email,
    exp: Date.now() + expiresInSeconds * 1000,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload, getAuthSecret());
  return `${encodedPayload}.${signature}`;
}

export function getSessionFromToken(token: string | undefined): Session | null {
  if (!token) {
    return null;
  }
  const payload = parseToken(token, "session");
  if (!payload) {
    return null;
  }
  return { email: payload.email };
}

export function validateMagicToken(token: string | null): Session | null {
  if (!token) {
    return null;
  }
  const payload = parseToken(token, "magic");
  if (!payload) {
    return null;
  }
  return { email: payload.email };
}

export function getAllowedEmails() {
  const list = process.env.AUTH_ALLOWED_EMAILS
    ?.split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return [...new Set(list ?? [])];
}

export function isAllowedEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const allowedEmails = getAllowedEmails();
  if (allowedEmails.length === 0) {
    return false;
  }
  return allowedEmails.includes(normalized);
}

export function buildAppUrl(request: Request) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}
