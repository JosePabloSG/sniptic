"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Obtener el email de los parámetros de búsqueda o del almacenamiento local
    const email = searchParams.get("email") || localStorage.getItem("pendingVerificationEmail")
    if (email) {
      setUserEmail(email)
      localStorage.setItem("pendingVerificationEmail", email)
    } else {
      // Si no hay email, redirigir al registro
      router.push("/auth/sign-up")
    }

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Usuario ha verificado su email y está autenticado
        localStorage.removeItem("pendingVerificationEmail")
        toast.success("¡Email verificado correctamente!")
        router.push("/dashboard")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [searchParams, router, supabase.auth])

  const resendVerificationEmail = async () => {
    if (!userEmail) return

    setIsResending(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?type=signup`
        }
      })

      if (error) {
        toast.error("Error al reenviar el email de verificación")
        console.error("Error:", error)
      } else {
        toast.success("Email de verificación reenviado")
      }
    } catch (error) {
      toast.error("Error al reenviar el email")
      console.error("Error:", error)
    } finally {
      setIsResending(false)
    }
  }

  const goBackToSignup = () => {
    localStorage.removeItem("pendingVerificationEmail")
    router.push("/auth/sign-up")
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icono principal */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>

          {/* Título y descripción */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verifica tu correo electrónico
          </h1>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace de verificación a:
          </p>

          {/* Email del usuario */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="font-medium text-gray-900">{userEmail}</p>
          </div>

          {/* Instrucciones */}
          <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">Para completar tu registro:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Revisa tu bandeja de entrada</li>
                  <li>Busca el email de Sniptic</li>
                  <li>Haz clic en el enlace de verificación</li>
                  <li>Serás redirigido automáticamente al dashboard</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Advertencia sobre spam */}
          <div className="text-left bg-yellow-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">¿No ves el email?</p>
                <p className="text-yellow-700">
                  Revisa tu carpeta de spam o correo no deseado. A veces los emails de verificación pueden llegar ahí.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button
              onClick={resendVerificationEmail}
              disabled={isResending}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Reenviando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reenviar email de verificación
                </>
              )}
            </Button>

            <Button
              onClick={goBackToSignup}
              variant="outline"
              className="w-full py-3 rounded-xl"
            >
              Cambiar email de registro
            </Button>
          </div>

          {/* Nota adicional */}
          <p className="text-xs text-gray-500 mt-6">
            Si continúas teniendo problemas, contacta con nuestro soporte.
          </p>
        </div>
      </div>
    </div>
  )
}
