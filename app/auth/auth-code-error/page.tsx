import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { AuthCodeErrorContent } from './auth-code-error-content'

function LoadingFallback() {
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
              Cargando información del error...
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

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCodeErrorContent />
    </Suspense>
  )
}
