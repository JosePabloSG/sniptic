"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export function AuthHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthMessages = async () => {
      // Verificar si hay parámetros de mensaje en la URL o hash
      const message = searchParams.get('message')
      const error = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')
      const type = searchParams.get('type')

      // También verificar el hash de la URL
      const hash = window.location.hash
      const hashParams = new URLSearchParams(hash.substring(1))
      const hashMessage = hashParams.get('message')
      const hashError = hashParams.get('error')
      const hashType = hashParams.get('type')

      // Manejo de mensajes de confirmación
      if (message || hashMessage) {
        const confirmationMessage = message || hashMessage
        const verificationType = type || hashType

        if (confirmationMessage?.includes('Confirmation link accepted')) {

          // Verificar si es un cambio de email
          if (confirmationMessage.includes('confirm link sent to the other email') ||
            verificationType === 'email_change' ||
            confirmationMessage.includes('other email')) {

            // Es un cambio de email - mostrar mensaje apropiado
            toast.success("Primer paso completado. Se ha enviado un email de verificación a tu nueva dirección.")

            // Limpiar la URL
            window.history.replaceState({}, document.title, window.location.pathname)

            // No redirigir, el usuario debe verificar el otro email
            return
          }

          // Es una verificación de signup - proceder normalmente
          const { data: { session } } = await supabase.auth.getSession()

          if (session) {
            // Usuario autenticado después de confirmación de signup
            localStorage.removeItem("pendingVerificationEmail")
            toast.success("¡Email verificado correctamente! Bienvenido a Sniptic.")

            // Limpiar la URL
            window.history.replaceState({}, document.title, window.location.pathname)

            // Redirigir al dashboard
            router.push('/dashboard')
          } else {
            // Problema con la sesión, redirigir a login
            toast.error("Hubo un problema al verificar tu cuenta. Por favor, inicia sesión.")
            router.push('/auth/login')
          }
        }
      }

      // Manejo de errores de autenticación
      if (error || hashError || errorDescription) {
        const errorMsg = errorDescription || error || hashError
        toast.error(`Error de autenticación: ${errorMsg}`)

        // Limpiar la URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }

    // Solo ejecutar si hay parámetros relevantes
    if (searchParams.toString() || window.location.hash) {
      handleAuthMessages()
    }
  }, [searchParams, router, supabase])

  return null // Este componente no renderiza nada
}
