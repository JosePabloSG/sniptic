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
import { MailOpen, Unlink, AlertTriangle, Eye, EyeOff, SquarePen } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

export function ProvidersSection() {
  const { accountData, loading, resetPassword, connectProvider, disconnectProvider, changeEmail } = useAccount()
  const [isResetting, setIsResetting] = useState(false)
  const [unlinkingProvider, setUnlinkingProvider] = useState<string | null>(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false)
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [isChangingEmail, setIsChangingEmail] = useState(false)
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null)

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
        toast.success('Te hemos enviado un enlace de reseteo a tu email.')
        setIsResetModalOpen(false)
        setCurrentPassword('')
      } else {
        setIsResetModalOpen(false)
        toast.error(result.error || 'No se pudo enviar el email de reseteo.')
      }
    } finally {
      setIsResetting(false)
    }
  }

  const handleVerifyPassword = async () => {
    if (!currentPassword.trim()) {
      toast.error('Por favor ingresa tu contraseña actual.')
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
        toast.error('La contraseña actual no es correcta.')
      }
    } catch (error) {
      toast.error('No se pudo verificar la contraseña. Inténtalo de nuevo.')
    } finally {
      setIsVerifyingPassword(false)
    }
  }

  const handleCloseModal = () => {
    setIsResetModalOpen(false)
    setCurrentPassword('')
    setShowPassword(false)
  }

  const handleChangeEmail = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      toast.error('Por favor ingresa un email válido.')
      return
    }

    if (newEmail === user?.email) {
      toast.error('El nuevo email debe ser diferente al actual.')
      return
    }

    setIsChangingEmail(true)
    try {
      const result = await changeEmail(newEmail)

      if (result.success) {
        toast.success(result.message || 'Te hemos enviado un enlace de confirmación al nuevo email.')
        setIsChangeEmailModalOpen(false)
        setNewEmail('')
      } else {
        toast.error(result.error || 'No se pudo procesar el cambio de email.')
      }
    } catch (error) {
      toast.error('No se pudo procesar el cambio de email. Inténtalo de nuevo.')
    } finally {
      setIsChangingEmail(false)
    }
  }

  const handleCloseEmailModal = () => {
    setIsChangeEmailModalOpen(false)
    setNewEmail('')
  }

  const handleUnlinkProvider = async (provider: string) => {
    if (connectedCount <= 1) {
      toast.error('Debes mantener al menos un método de acceso conectado.')
      return
    }

    setUnlinkingProvider(provider)
    try {
      const result = await disconnectProvider(provider.toLowerCase() as 'google' | 'github' | 'email')

      if (result.success) {
        toast.success(`${provider} ha sido desconectado exitosamente.`)
      } else {
        toast.error(result.error || 'No se pudo desconectar el proveedor.')
      }
    } catch (error) {
      toast.error('No se pudo desconectar el proveedor. Inténtalo de nuevo.')
    } finally {
      setUnlinkingProvider(null)
    }
  }

  const handleConnectProvider = async (provider: 'google' | 'github') => {
    setConnectingProvider(provider)
    try {
      const result = await connectProvider(provider)

      if (result.success) {
        toast.success(`${provider} ha sido conectado exitosamente.`)
      } else {
        toast.error(result.error || 'No se pudo conectar el proveedor.')
      }
    } catch (error) {
      toast.error('No se pudo conectar el proveedor. Inténtalo de nuevo.')
    } finally {
      setConnectingProvider(null)
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
          {/* Email Provider - Solo mostrar si está conectado */}
          {connectedAccounts.email && (
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
                    <p className="text-sm text-muted-foreground truncate">
                      {user?.email || 'Sin email configurado'}
                    </p>
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
                          onClick={() => setIsChangeEmailModalOpen(true)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <SquarePen className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cambiar email</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {connectedCount > 1 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleUnlinkProvider('Email')}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            disabled={unlinkingProvider === 'Email'}
                          >
                            {unlinkingProvider === 'Email' ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Unlink className="w-4 h-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Desconectar Email</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GitHub Provider - Solo mostrar si está conectado */}
          {connectedAccounts.github && (
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
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        Conectado
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sincroniza repos de GitHub a proyectos de Supabase para creación automática de ramas y fusión
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
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
                </div>
              </div>
            </div>
          )}

          {/* Google Provider - Solo mostrar si está conectado */}
          {connectedAccounts.google && (
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
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        Conectado
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Accede con tu cuenta de Google
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
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
                </div>
              </div>
            </div>
          )}

          {/* Mensaje cuando no hay proveedores conectados */}
          {connectedCount === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">
                No tienes proveedores conectados. Esto no debería ocurrir ya que necesitas al menos uno para acceder.
              </p>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnectProvider('google')}
                  disabled={connectingProvider === 'google'}
                >
                  {connectingProvider === 'google' ? 'Conectando...' : 'Conectar Google'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnectProvider('github')}
                  disabled={connectingProvider === 'github'}
                >
                  {connectingProvider === 'github' ? 'Conectando...' : 'Conectar GitHub'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para cambiar email */}
      <Dialog open={isChangeEmailModalOpen} onOpenChange={setIsChangeEmailModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar dirección de email</DialogTitle>
            <DialogDescription>
              Ingresa tu nueva dirección de email. Te enviaremos un enlace de confirmación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-email">Email actual</Label>
              <Input
                id="current-email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-email">Nuevo email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nuevo@email.com"
                disabled={isChangingEmail}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleChangeEmail()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseEmailModal}
              disabled={isChangingEmail}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleChangeEmail}
              disabled={isChangingEmail || !newEmail.trim()}
            >
              {isChangingEmail ? 'Enviando...' : 'Cambiar email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
