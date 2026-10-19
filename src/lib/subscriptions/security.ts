import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const TOKEN_VERSION = 'v1';

export function opaqueToken() {
  return randomBytes(32).toString('base64url');
}

export function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function subscriberIdFor(email: string) {
  return sha256(normalizeEmail(email));
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createUnsubscribeToken(
  subscriberId: string,
  secret: string,
  now = Date.now(),
  lifetimeSeconds = 180 * 24 * 60 * 60,
) {
  const expiresAt = Math.floor(now / 1000) + lifetimeSeconds;
  const payload = `${TOKEN_VERSION}.${subscriberId}.${expiresAt}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload, secret)}`;
}

export function verifyUnsubscribeToken(
  subscriberId: string,
  token: string,
  secrets: readonly string[],
  now = Date.now(),
) {
  try {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return false;
    const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const [version, tokenSubscriberId, expiresAtValue] = payload.split('.');
    const expiresAt = Number(expiresAtValue);
    if (
      version !== TOKEN_VERSION ||
      tokenSubscriberId !== subscriberId ||
      !Number.isSafeInteger(expiresAt) ||
      expiresAt < Math.floor(now / 1000)
    ) {
      return false;
    }
    return secrets.some((secret) => {
      const expected = Buffer.from(sign(payload, secret));
      const received = Buffer.from(signature);
      return expected.length === received.length && timingSafeEqual(expected, received);
    });
  } catch {
    return false;
  }
}

export function clientAddress(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

export function requestFingerprint(request: Request) {
  return sha256(clientAddress(request)).slice(0, 24);
}

export function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const configured = process.env.PUBLIC_SITE_URL;
  const expected = configured ? new URL(configured).origin : new URL(request.url).origin;
  return origin === expected;
}

export function tokenSecrets() {
  return [
    process.env.SUBSCRIPTION_TOKEN_SECRET,
    process.env.SUBSCRIPTION_TOKEN_SECRET_PREVIOUS,
  ].filter((value): value is string => Boolean(value));
}
