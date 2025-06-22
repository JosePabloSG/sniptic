"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAccount } from '@/hooks/use-account'
import { useToast } from '@/components/ui/toast'
import { Github, Mail, Chrome, MailOpen, Unlink, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export function ProvidersSection() {
  const { accountData, loading, resetPassword } = useAccount()
  const { addToast } = useToast()
  const [isResetting, setIsResetting] = useState(false)
  const [unlinkingProvider, setUnlinkingProvider] = useState<string | null>(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false)

  const user = accountData.user
  const connectedAccounts = accountData.connectedAccounts

  // Contar providers conectados
  const connectedCount = Object.values(connectedAccounts).filter(Boolean).length

  const handleResetPassword = async () => {
    if (!user?.email) return

    setIsResetting(true)
    try {
      const result = await resetPassword(user.email)
      if (result.success) {
        addToast({
          type: 'success',
          title: 'Email enviado',
          description: 'Te hemos enviado un enlace para resetear tu contraseña.'
        })
        setIsResetModalOpen(false)
        setCurrentPassword('')
      } else {
        setIsResetModalOpen(false)
        addToast({
          type: 'error',
          title: 'Error al enviar email',
          description: result.error || 'No se pudo enviar el email de reseteo.'
        })
      }
    } finally {
      setIsResetting(false)
    }
  }

  const handleVerifyPassword = async () => {
    if (!currentPassword.trim()) {
      addToast({
        type: 'error',
        title: 'Contraseña requerida',
        description: 'Por favor ingresa tu contraseña actual.'
      })
      return
    }

    setIsVerifyingPassword(true)
    try {
      // Aquí simularías la verificación de la contraseña actual
      // En un caso real, harías una llamada a la API para verificar la contraseña
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulamos que la contraseña es correcta si tiene más de 6 caracteres
      if (currentPassword.length >= 6) {
        // Si la contraseña es correcta, proceder con el reset
        await handleResetPassword()
      } else {
        addToast({
          type: 'error',
          title: 'Contraseña incorrecta',
          description: 'La contraseña actual no es correcta.'
        })
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error de verificación',
        description: 'No se pudo verificar la contraseña. Inténtalo de nuevo.'
      })
    } finally {
      setIsVerifyingPassword(false)
    }
  }

  const handleCloseModal = () => {
    setIsResetModalOpen(false)
    setCurrentPassword('')
    setShowPassword(false)
  }

  const handleUnlinkProvider = async (provider: string) => {
    if (connectedCount <= 1) {
      addToast({
        type: 'error',
        title: 'No se puede desconectar',
        description: 'Debes mantener al menos un método de acceso conectado.'
      })
      return
    }

    setUnlinkingProvider(provider)
    try {
      // Aquí iría la lógica para desconectar el provider
      // Por ahora simulo la operación
      await new Promise(resolve => setTimeout(resolve, 1000))

      addToast({
        type: 'success',
        title: 'Proveedor desconectado',
        description: `${provider} ha sido desconectado exitosamente.`
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error al desconectar',
        description: 'No se pudo desconectar el proveedor. Inténtalo de nuevo.'
      })
    } finally {
      setUnlinkingProvider(null)
    }
  }

  if (loading || !user) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
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
            Conecta tu cuenta de Supabase con otros servicios.
          </p>
        </div>

        {/* Nota informativa */}
        <div className="flex items-center space-x-2 p-3 bg-muted/30 border rounded-md">
          <AlertTriangle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Nota:</span> Necesitas al menos un método de acceso conectado para iniciar sesión.
          </p>
        </div>

        <div className="space-y-3">
          {/* Email Provider */}
          <div className="group hover:bg-muted/30 transition-colors rounded-lg">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <MailOpen className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">Email</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      Conectado
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Resetear contraseña
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirmar contraseña actual</DialogTitle>
                      <DialogDescription>
                        Por seguridad, confirma tu contraseña actual antes de enviar el enlace de restablecimiento.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña actual"
                            disabled={isVerifyingPassword}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleVerifyPassword()
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isVerifyingPassword}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCloseModal}
                        disabled={isVerifyingPassword}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleVerifyPassword}
                        disabled={isVerifyingPassword || !currentPassword.trim()}
                      >
                        {isVerifyingPassword ? 'Verificando...' : 'Enviar enlace'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleUnlinkProvider('Email')}
                        variant="ghost"
                        size="sm"
                        disabled={connectedCount <= 1 || unlinkingProvider === 'Email'}
                        className="h-8 w-8 p-0"
                      >
                        <Unlink className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Desconectar Email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* GitHub Provider */}
          <div className="group hover:bg-muted/30 transition-colors rounded-lg">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/github.svg"
                    alt="GitHub Icon"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">GitHub</span>
                    {connectedAccounts.github ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        Conectado
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
                      >
                        No conectado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sincroniza repos de GitHub a proyectos de Supabase para creación automática de ramas y fusión
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {connectedAccounts.github ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleUnlinkProvider('GitHub')}
                          variant="ghost"
                          size="sm"
                          disabled={connectedCount <= 1 || unlinkingProvider === 'GitHub'}
                          className="h-8 w-8 p-0"
                        >
                          <Unlink className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Desconectar GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button variant="outline" size="sm">
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Google Provider */}
          <div className="group hover:bg-muted/30 transition-colors rounded-lg">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/google.svg"
                    alt="Google Icon"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">Google</span>
                    {connectedAccounts.google ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        Conectado
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
                      >
                        No conectado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accede con tu cuenta de Google
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {connectedAccounts.google ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleUnlinkProvider('Google')}
                          variant="ghost"
                          size="sm"
                          disabled={connectedCount <= 1 || unlinkingProvider === 'Google'}
                          className="h-8 w-8 p-0"
                        >
                          <Unlink className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Desconectar Google</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button variant="outline" size="sm">
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
