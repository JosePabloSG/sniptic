"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAccount } from '@/hooks/use-account'
import { Monitor, Smartphone, Globe, MapPin, Clock } from 'lucide-react'

export function ConnectionsSection() {
  const { accountData, loading } = useAccount()
  const user = accountData.user

  const mockConnections = [
    {
      id: '1',
      type: 'web',
      browser: 'Chrome',
      os: 'macOS',
      location: 'Ciudad de México, México',
      lastActive: new Date().toISOString(),
      current: true
    },
    {
      id: '2',
      type: 'mobile',
      browser: 'Safari',
      os: 'iOS',
      location: 'Ciudad de México, México',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      current: false
    }
  ]

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Ahora mismo'
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} horas`
    return `Hace ${Math.floor(diffInMinutes / 1440)} días`
  }

  if (loading || !user) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
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
          <h3 className="text-lg font-medium">Conexiones</h3>
          <p className="text-sm text-muted-foreground">
            Información sobre dónde y cuándo has iniciado sesión en tu cuenta.
          </p>
        </div>

        <div className="space-y-4">
          {mockConnections.map((connection, index) => (
            <div key={connection.id}>
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {connection.type === 'web' ? (
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {connection.browser} en {connection.os}
                      </span>
                      {connection.current && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Sesión actual
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatRelativeTime(connection.lastActive)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{connection.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-3 h-3" />
                      <span>IP: 192.168.1.***</span>
                    </div>
                  </div>
                </div>
              </div>

              {index < mockConnections.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Actividad Reciente</h4>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">Inicio de sesión desde Chrome</p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(new Date().toISOString())}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">Perfil actualizado</p>
                <p className="text-xs text-muted-foreground">
                  Hace 2 días
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">Cuenta creada</p>
                <p className="text-xs text-muted-foreground">
                  {user.created_at ? formatRelativeTime(user.created_at) : 'Fecha no disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
