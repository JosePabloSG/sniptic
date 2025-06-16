import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { isPublicRoute, handleAuthRedirect } from './config/routes'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always update the session first
  const response = await updateSession(request)

  // Get the user from the response headers
  const user = response.headers.get('x-user')

  // Handle public routes and auth redirects
  if (isPublicRoute(pathname)) {
    const authRedirect = handleAuthRedirect(request, user, pathname)
    if (authRedirect) return authRedirect
    return response
  }

  // Handle protected routes
  const authRedirect = handleAuthRedirect(request, user, pathname)
  if (authRedirect) return authRedirect

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}