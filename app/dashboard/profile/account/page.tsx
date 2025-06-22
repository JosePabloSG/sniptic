"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import {
  ProfileSection,
  ProvidersSection,
  SecurityInfoSection,
  DangerZoneSection
} from '@/components/account'

export default function AccountPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = searchParams.get('code')

      if (code) {
        console.log('Handling OAuth callback with code:', code)

        try {
          const supabase = createClient()
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            console.error('Error exchanging code:', error)
            toast.error('Error conectando proveedor: ' + error.message)
            router.replace('/dashboard/profile/account')
            return
          }

          console.log('Successfully handled OAuth callback')
          toast.success('Proveedor conectado exitosamente')

          // Limpiar la URL removiendo el código y forzar actualización
          router.replace('/dashboard/profile/account')

          // Forzar actualización del componente para que los hooks se refresquen
          setTimeout(() => {
            setRefreshKey(prev => prev + 1)
            window.location.reload() // Como último recurso para asegurar la actualización
          }, 100)

        } catch (error) {
          console.error('Unexpected error handling callback:', error)
          toast.error('Error inesperado al conectar proveedor')
          router.replace('/dashboard/profile/account')
        }
      }
    }

    handleOAuthCallback()
  }, [searchParams, router])

  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6" key={refreshKey}>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Configuración de Cuenta</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal, configuraciones de seguridad y preferencias de cuenta.
        </p>
      </div>

      {/* Profile Information */}
      <ProfileSection />

      {/* Providers - Email, Google & GitHub */}
      <ProvidersSection />

      {/* Security Information */}
      <SecurityInfoSection />

      {/* Danger Zone */}
      <DangerZoneSection />
    </div>
  )
}
