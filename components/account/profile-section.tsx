"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import Loader from '@/components/ui/loader'
import { useAccount } from '@/hooks/use-account'
import { useToast } from '@/components/ui/toast'

interface ProfileSectionProps {
  onSaved?: () => void
}

export function ProfileSection({ onSaved }: ProfileSectionProps) {
  const { accountData, loading, updateProfile } = useAccount()
  const { addToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  })

  const user = accountData.user

  const handleEdit = () => {
    setFormData({
      first_name: user?.user_metadata?.full_name?.split(' ')[0] || user?.first_name || '',
      last_name: user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user?.last_name || ''
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({ first_name: '', last_name: '' })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const full_name = `${formData.first_name} ${formData.last_name}`.trim()
      const result = await updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        full_name: full_name || undefined
      })

      if (result.success) {
        setIsEditing(false)
        addToast({
          type: 'success',
          title: 'Perfil actualizado',
          description: 'Tu información personal ha sido actualizada correctamente.'
        })
        onSaved?.()
      } else {
        addToast({
          type: 'error',
          title: 'Error al actualizar perfil',
          description: result.error || 'Hubo un problema al actualizar tu perfil.'
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Loader size="sm" />
          <span className="text-sm text-muted-foreground">Cargando información del perfil...</span>
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
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nombre</Label>
                  <p className="mt-1 text-sm">
                    {user.user_metadata?.full_name ||
                      `${user.first_name || ''} ${user.last_name || ''}`.trim() ||
                      'No especificado'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Correo electrónico</Label>
                  <p className="mt-1 text-sm">{user.email}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleEdit} variant="outline" size="sm">
                  Editar perfil
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">Nombre</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Apellido</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button onClick={handleCancel} variant="outline" size="sm" disabled={isSaving}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} size="sm" disabled={isSaving}>
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
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
