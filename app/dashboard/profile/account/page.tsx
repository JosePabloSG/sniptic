"use client"

import {
  ProfileSection,
  ProvidersSection,
  SecurityInfoSection,
  DangerZoneSection
} from '@/components/account'
import { ToastProvider } from '@/components/ui/toast'

export default function AccountPage() {
  return (
    <ToastProvider>
      <div className="container max-w-4xl mx-auto py-6 space-y-6">
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
    </ToastProvider>
  )
}
