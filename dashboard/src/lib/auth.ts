/**
 * Session handling for the demo dashboard.
 *
 * Credentials live in environment variables, never in the repository — this
 * repo is public, so a literal password here would be readable by anyone and
 * would stay in the git history forever.
 *
 * The cookie carries an HMAC of the username plus an expiry, signed with
 * AUTH_SECRET. That is enough to stop a hand-written cookie from granting
 * access; it is not a substitute for a real identity provider if this ever
 * guards anything of value.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export { SESSION_COOKIE } from "./session-cookie";

/** Sessions last a working day, then the user signs in again. */
const MAX_AGE_SECONDS = 60 * 60 * 12;

interface Credentials {
  user: string;
  password: string;
  secret: string;
}

/**
 * Reads credentials at call time rather than module load, so a missing value
 * surfaces on the request that needs it instead of crashing the whole server
 * at boot.
 */
function getCredentials(): Credentials {
  const user = process.env.AUTH_USER;
  const password = process.env.AUTH_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (!user || !password || !secret) {
    throw new Error(
      "AUTH_USER, AUTH_PASSWORD and AUTH_SECRET must be set. See .env.example.",
    );
  }
  return { user, password, secret };
}

const sign = (payload: string, secret: string): string =>
  createHmac("sha256", secret).update(payload).digest("hex");

/** Constant-time compare — a plain `===` leaks length and prefix by timing. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(user: string, password: string): boolean {
  const expected = getCredentials();
  // Both compared even when the user is wrong, so a bad username and a bad
  // password take the same time.
  const userOk = safeEqual(user, expected.user);
  const passwordOk = safeEqual(password, expected.password);
  return userOk && passwordOk;
}

/**
 * The username is base64url-encoded before it goes into the token.
 *
 * Without this the separator is ambiguous: a username like `virtual.demo`
 * already contains a dot, so splitting the token on "." yields four segments
 * instead of three and every session is rejected — which then bounces the
 * browser between `/` and `/login` forever.
 */
const encodeUser = (user: string): string => Buffer.from(user, "utf8").toString("base64url");
const decodeUser = (encoded: string): string =>
  Buffer.from(encoded, "base64url").toString("utf8");

export function createSessionToken(user: string): string {
  const { secret } = getCredentials();
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${encodeUser(user)}.${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function readSessionToken(token: string | undefined): string | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [encoded, expires, signature] = parts;

  let secret: string;
  try {
    secret = getCredentials().secret;
  } catch {
    return null;
  }

  if (!safeEqual(signature, sign(`${encoded}.${expires}`, secret))) return null;
  if (Number(expires) < Date.now()) return null;

  try {
    return decodeUser(encoded);
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
  // Set only over HTTPS in production; leaving it on in dev would stop the
  // cookie from ever being stored on http://localhost.
  secure: process.env.NODE_ENV === "production",
};
