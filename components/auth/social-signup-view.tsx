"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Loader from "@/components/ui/loader"

interface SocialSignupViewProps {
  onShowEmailSignupAction: () => void
}

export function SocialSignupView({ onShowEmailSignupAction }: SocialSignupViewProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(provider)
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/confirm`,
        },
      })
    } catch (error) {
      console.error(`Error al registrarse con ${provider}:`, error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Crea tu cuenta</h1>
      <p className="text-gray-500 mt-2 mb-8">Únete a nuestra comunidad de programadores modernos.</p>

      <div className="w-full space-y-3">
        <Button
          variant="outline"
          className="w-full py-6 text-base group rounded-2xl border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          onClick={() => handleSocialSignup('google')}
          disabled={isLoading !== null}
        >
          {isLoading === 'google' ? (
            <>
              <Loader size="sm" variant="spinner" color="muted" className="mr-2" />
              Conectando...
            </>
          ) : (
            <>
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5 mr-2 transition-transform"
              />
              Continuar con Google
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-base group rounded-2xl border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          onClick={() => handleSocialSignup('github')}
          disabled={isLoading !== null}
        >
          {isLoading === 'github' ? (
            <>
              <Loader size="sm" variant="spinner" color="muted" className="mr-2" />
              Conectando...
            </>
          ) : (
            <>
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="w-5 h-5 mr-2 transition-transform"
              />
              Continuar con GitHub
            </>
          )}
        </Button>
      </div>

      <div className="relative my-6 w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-gray-500">O</span>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={onShowEmailSignupAction}
        className="w-full py-6 text-base group rounded-2xl text-[#10B981] hover:bg-[#10B981]/10 hover:text-[#10B981]"
      >
        <Mail className="w-5 h-5 mr-2" />
        Continuar con Email
      </Button>

      <p className="mt-8 text-center text-sm text-gray-500">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/login" className="font-medium text-[#10B981] hover:text-[#059669] transition-colors">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
