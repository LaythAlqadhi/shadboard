import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

import type { NextRequestWithAuth } from "next-auth/middleware"

import { isGuestRoute, isPublicRoute } from "@/lib/auth-routes"
import {
  ensureLocalizedPathname,
  getLocaleFromPathname,
  getPreferredLocale,
  isPathnameMissingLocale,
} from "@/lib/i18n"
import { ensureRedirectPathname, ensureWithoutPrefix } from "@/lib/utils"

function redirect(pathname: string, request: NextRequestWithAuth) {
  const { search, hash } = request.nextUrl
  let resolvedPathname = pathname

  if (isPathnameMissingLocale(pathname)) {
    const preferredLocale = getPreferredLocale(request)
    resolvedPathname = ensureLocalizedPathname(pathname, preferredLocale)
  }
  if (search) {
    resolvedPathname += search
  }
  if (hash) {
    resolvedPathname += hash
  }

  const redirectUrl = new URL(resolvedPathname, request.url).toString()
  return NextResponse.redirect(redirectUrl)
}

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl

    const locale = getLocaleFromPathname(pathname)
    const pathnameWithoutLocale = ensureWithoutPrefix(pathname, `/${locale}`)
    const isNotPublic = !isPublicRoute(pathnameWithoutLocale)

    // Handle authentication for protected and guest routes
    if (isNotPublic) {
      const isAuthenticated = !!request.nextauth.token
      const isGuest = isGuestRoute(pathnameWithoutLocale)
      const isProtected = !isGuest

      // Redirect authenticated users away from guest routes
      if (isAuthenticated && isGuest) {
        return redirect(process.env.HOME_PATHNAME || "/", request)
      }

      // Redirect unauthenticated users from protected routes to sign-in
      if (!isAuthenticated && isProtected) {
        let redirectPathname = "/sign-in"

        // Maintain the original path for redirection
        if (pathnameWithoutLocale !== "") {
          redirectPathname = ensureRedirectPathname(redirectPathname, pathname)
        }

        return redirect(redirectPathname, request)
      }
    }

    // Redirect to localized URL if the pathname is missing a locale
    if (!locale) {
      return redirect(pathname, request)
    }

    /**
     * NOTE
     * If your homepage is not '/', you need to configure a redirect
     * in next.config.mjs using the redirects() function,
     * and set the HOME_PATHNAME environment variable accordingly.
     *
     * See https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirects-in-nextconfigjs
     */

    return NextResponse.next()
  },
  {
    callbacks: {
      // Always authorize requests to ensure the middleware function is called
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images folder
     * - homepage '/'
     * - docs
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|docs).*)",
  ],
}
