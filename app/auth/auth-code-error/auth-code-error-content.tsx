"use client"

import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export function AuthCodeErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'no-code':
        return 'No se recibió código de autorización'
      case 'unexpected':
        return 'Error inesperado durante la autenticación'
      default:
        return errorCode || 'Error desconocido en la autenticación'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold">Error de Autenticación</h1>
            <p className="text-sm text-muted-foreground">
              {getErrorMessage(error)}
            </p>
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <Button asChild>
              <Link href="/dashboard/profile">
                Ir al Perfil
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/auth/login">
                Iniciar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
