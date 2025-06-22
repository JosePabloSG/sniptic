"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AuthConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleAuthComplete = async () => {
      try {        // Verificar si viene de una verificación exitosa
        const verified = searchParams.get('verified')
        const verificationType = searchParams.get('type')

        if (verified === 'true') {
          // Email ya verificado, verificar sesión
          const { data: { session }, error: sessionError } = await supabase.auth.getSession()

          if (sessionError) {
            console.error("Error al obtener la sesión:", sessionError)
            setStatus('error')
            setErrorMessage("Error al verificar la sesión")
            return
          }

          if (session) {
            // Manejar según el tipo de verificación
            if (verificationType === 'email_change') {
              setStatus('success')
              toast.success("¡Email cambiado correctamente!")

              setTimeout(() => {
                router.push("/dashboard/profile")
              }, 1500)
              return
            } else {
              // Usuario autenticado correctamente (signup)
              setStatus('success')
              localStorage.removeItem("pendingVerificationEmail")
              toast.success("¡Email verificado correctamente! Bienvenido a Sniptic.")

              setTimeout(() => {
                router.push("/dashboard")
              }, 1500)
              return
            }
          }
        }

        // Lógica original para verificación con token
        const token_hash = searchParams.get('token_hash')
        const type = searchParams.get('type')
        const next = searchParams.get('next') || '/dashboard'

        if (token_hash && type) {
          // Verificar el email usando el token
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          })

          if (error) {
            console.error("Error al confirmar la autenticación:", error)
            setStatus('error')
            setErrorMessage(error.message || "Error al verificar el email")
            return
          }

          // Si es un cambio de email, manejar diferente
          if (type === 'email_change') {
            setStatus('success')
            toast.success("¡Email cambiado correctamente!")

            setTimeout(() => {
              router.push("/dashboard/profile")
            }, 1500)
            return
          }
        }

        // Verificar si el usuario está autenticado
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Error al obtener la sesión:", sessionError)
          setStatus('error')
          setErrorMessage("Error al verificar la sesión")
          return
        }

        if (session) {
          // Email verificado correctamente (signup)
          setStatus('success')
          localStorage.removeItem("pendingVerificationEmail")
          toast.success("¡Email verificado correctamente! Bienvenido a Sniptic.")

          setTimeout(() => {
            router.push(next)
          }, 1500)
        } else {
          setStatus('error')
          setErrorMessage("No se pudo establecer la sesión")
        }
      } catch (error) {
        console.error("Error inesperado:", error)
        setStatus('error')
        setErrorMessage("Ocurrió un error inesperado")
      }
    }

    handleAuthComplete()
  }, [router, supabase.auth, searchParams])

  const handleRetry = () => {
    router.push("/auth/sign-up");
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="animate-pulse text-center">
            <div className="w-16 h-16 border-4 border-t-[#10B981] border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">
              Verificando tu email...
            </h1>
            <p className="text-gray-600">
              Por favor espera mientras confirmamos tu cuenta.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Email verificado!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido verificada correctamente. Serás redirigido al dashboard en unos segundos.
          </p>
          <Button
            onClick={handleGoToDashboard}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            Ir al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error de verificación
          </h1>
          <p className="text-gray-600 mb-2">
            Hubo un problema al verificar tu email.
          </p>
          <p className="text-sm text-red-600 mb-6">
            {errorMessage}
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Intentar de nuevo
            </Button>
            <Button
              onClick={() => router.push("/auth/login")}
              variant="outline"
              className="w-full py-3 rounded-xl"
            >
              Ir al login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
