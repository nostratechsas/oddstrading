import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/session-cookie";

/**
 * Gate every page behind a session.
 *
 * The token's signature is verified in the route handlers, not here: Edge
 * middleware has no `node:crypto`. This only checks that a cookie is present,
 * which is enough to bounce anonymous visitors to the login screen — the
 * dashboard layout re-verifies the signature server-side before rendering.
 */
export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const { pathname } = request.nextUrl;

  // Only the anonymous case is handled here. Bouncing a *present* cookie off
  // /login would deadlock: an expired or forged cookie makes the dashboard
  // redirect to /login, and middleware — which cannot check the signature —
  // would send it straight back. Sending a valid session away from /login is
  // therefore the login page's job, since it can verify.
  if (!hasSession && pathname !== "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // Remember where they were headed so login can send them back.
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next's own assets, the auth endpoints and static files.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|bookies|assets).*)"],
};
