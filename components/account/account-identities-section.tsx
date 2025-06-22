"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAccount } from '@/hooks/use-account'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'

export function AccountIdentitiesSection() {
  const { accountData, loading, resetPassword } = useAccount()
  const [isResetting, setIsResetting] = useState(false)

  const user = accountData.user
  const connectedAccounts = accountData.connectedAccounts

  const handleResetPassword = async () => {
    if (!user?.email) return

    setIsResetting(true)
    try {
      const result = await resetPassword(user.email)
      if (result.success) {
        toast.success('Te hemos enviado un enlace para resetear tu contraseña.')
      } else {
        toast.error(result.error || 'No se pudo enviar el email de reseteo.')
      } 
    } finally {
      setIsResetting(false)
    }
  }

  if (loading || !user) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-muted rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Identidades de Cuenta</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona los métodos de autenticación de tu cuenta.
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Identity */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Email</span>
                  {connectedAccounts.email && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Conectado
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button
              onClick={handleResetPassword}
              variant="outline"
              size="sm"
              disabled={isResetting}
            >
              {isResetting ? 'Enviando...' : 'Resetear contraseña'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
