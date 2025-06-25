"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Loader from '@/components/ui/loader'
import { useAccount } from '@/hooks/use-account'
import { toast } from 'sonner'

interface ProfileSectionProps {
  onSaved?: () => void
}

export function ProfileSection({ onSaved }: ProfileSectionProps) {
  const { accountData, loading, updateProfile } = useAccount()
  const [isSaving, setIsSaving] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [formData, setFormData] = useState({
    name: ''
  })

  const user = accountData.user

  // Inicializar formData cuando el usuario esté disponible (solo una vez)
  useEffect(() => {
    if (user && !isInitialized) {
      const fullName = user.user_metadata?.full_name || user.full_name || ''
      setFormData({
        name: fullName
      })
      setIsInitialized(true)
    }
  }, [user, isInitialized])

  // Función para verificar si hay cambios
  const hasChanges = () => {
    if (!user) return false
    const originalName = user.user_metadata?.full_name || user.full_name || ''

    return formData.name !== originalName
  }

  const handleReset = () => {
    if (user) {
      const fullName = user.user_metadata?.full_name || user.full_name || ''
      setFormData({
        name: fullName
      })
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await updateProfile({
        full_name: formData.name || undefined
      })

      if (result.success) {
        toast.success('Tu información personal ha sido actualizada correctamente.')
        onSaved?.()
      } else {
        toast.error(result.error || 'Hubo un problema al actualizar tu perfil.')
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex justify-end space-x-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">No se pudo cargar la información del usuario</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Información del Perfil</h3>
          <p className="text-sm text-muted-foreground">
            Actualiza tu información personal aquí.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Usuario</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Tu nombre o nombre de usuario"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">Correo electrónico</Label>
            <Input
              value={user.email}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              disabled={isSaving || !hasChanges()}
            >
              Restablecer
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              disabled={isSaving || !hasChanges()}
            >
              {isSaving ? (
                <>
                  <Loader size="sm" className="mr-2" />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
