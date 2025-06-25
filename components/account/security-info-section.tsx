"use client"

import { Card } from '@/components/ui/card'
import { useAccount } from '@/hooks/use-account'
import { Clock, Calendar } from 'lucide-react'

export function SecurityInfoSection() {
  const { accountData, loading } = useAccount()
  const user = accountData.user

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No disponible'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading || !user) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Información de Seguridad</h3>
          <p className="text-sm text-muted-foreground">
            Detalles sobre la seguridad y actividad de tu cuenta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg border">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Última conexión</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(user.last_sign_in_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg border">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Cuenta creada</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(user.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
