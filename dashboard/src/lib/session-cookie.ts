/**
 * The session cookie's name, on its own.
 *
 * `lib/auth.ts` pulls in `node:crypto`, which the Edge runtime cannot bundle —
 * so the middleware imports the name from here instead of dragging the whole
 * signing module into Edge.
 */
export const SESSION_COOKIE = "ot_session";
