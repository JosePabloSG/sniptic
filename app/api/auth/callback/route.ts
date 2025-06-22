import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Callback received with code:', code ? 'present' : 'missing')
  console.log('Callback type:', type)

  if (code) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
      }

      console.log('Successfully exchanged code for session')

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'

      // Si es una verificación de email signup, redirigir a la página de confirmación
      if (type === 'signup' || type === 'email') {
        const confirmUrl = `${origin}/auth/confirm?verified=true&type=${type}`
        if (isLocalEnv) {
          return NextResponse.redirect(confirmUrl)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}/auth/confirm?verified=true&type=${type}`)
        } else {
          return NextResponse.redirect(confirmUrl)
        }
      }

      // Si es un cambio de email, redirigir a la confirmación con tipo específico
      if (type === 'email_change') {
        const confirmUrl = `${origin}/auth/confirm?verified=true&type=email_change`
        if (isLocalEnv) {
          return NextResponse.redirect(confirmUrl)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}/auth/confirm?verified=true&type=email_change`)
        } else {
          return NextResponse.redirect(confirmUrl)
        }
      }

      // Para otros tipos de autenticación, usar la redirección normal
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } catch (error) {
      console.error('Unexpected error in callback:', error)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=unexpected`)
    }
  }

  console.log('No code provided in callback')
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no-code`)
}
