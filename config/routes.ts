import { NextRequest, NextResponse } from 'next/server'

// Define route types for better type safety
export type RouteConfig = {
  public?: boolean
  auth?: boolean
}

// Route configuration map
export const routes: Record<string, RouteConfig> = {
  // Public routes
  '/': { public: true },
  '/auth/login': { public: true },
  '/auth/sign-up': { public: true },
  '/auth/verify-email': { public: true },
  '/auth/confirm': { public: true },
  '/auth/auth-code-error': { public: true },
  '/api/auth/callback': { public: true },
  // Protected routes (everything else)
  '/dashboard': { auth: true },
  '/private': { auth: true },
}

// Helper function to check if a path is public
export const isPublicRoute = (path: string): boolean => {
  // Check exact matches first
  if (routes[path]?.public) return true

  // Check if the path starts with any public route prefix
  return Object.entries(routes).some(([route, config]) =>
    config.public && path.startsWith(route)
  )
}

// Helper function to check if a route requires authentication
export const requiresAuth = (path: string): boolean => {
  // Check exact matches first
  if (routes[path]?.auth) return true

  // Check if the path starts with any protected route prefix
  return Object.entries(routes).some(([route, config]) =>
    config.auth && path.startsWith(route)
  )
}

// Helper function to handle auth redirects
export const handleAuthRedirect = (request: NextRequest, user: string | null, pathname: string): NextResponse | null => {
  // If user is already logged in and tries to access login page, redirect to dashboard
  if (user && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If authentication is required and no user is present, redirect to login
  if (requiresAuth(pathname) && !user) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return null
}
