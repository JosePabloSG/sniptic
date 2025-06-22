"use client"

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  last_sign_in_at?: string
  created_at?: string
  updated_at?: string
  email_confirmed_at?: string
  app_metadata?: {
    provider?: string
    providers?: string[]
  }
  user_metadata?: {
    avatar_url?: string
    email?: string
    email_verified?: boolean
    full_name?: string
    iss?: string
    name?: string
    phone_verified?: boolean
    picture?: string
    provider_id?: string
    sub?: string
  }
}

export interface AccountData {
  user: UserProfile | null
  sessions: any[]
  connectedAccounts: {
    google?: boolean
    github?: boolean
    email?: boolean
  }
}

export function useAccount() {
  const [accountData, setAccountData] = useState<AccountData>({
    user: null,
    sessions: [],
    connectedAccounts: {
      google: false,
      github: false,
      email: false
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchAccountData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Obtener usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      if (!user) {
        setAccountData({
          user: null,
          sessions: [],
          connectedAccounts: {
            google: false,
            github: false,
            email: false
          }
        })
        return
      }

      // Determinar cuentas conectadas basado en los providers
      const providers = user.app_metadata?.providers || []
      const connectedAccounts = {
        google: providers.includes('google'),
        github: providers.includes('github'),
        email: providers.includes('email') || user.email_confirmed_at !== null
      }

      // Por ahora no obtenemos sesiones ya que requiere privilegios de admin
      // En una implementación real, esto se haría a través de una API route

      setAccountData({
        user: user as UserProfile,
        sessions: [],
        connectedAccounts
      })

    } catch (err) {
      console.error('Error fetching account data:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: {
    full_name?: string
  }) => {
    try {
      setError(null)

      const { error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) throw error

      // Refrescar datos
      await fetchAccountData()
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error actualizando perfil'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) throw error
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error enviando reset de contraseña'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteAccount = async () => {
    try {
      setError(null)

      // Esto debería hacerse a través de una función Edge o API route
      // ya que requiere privilegios de admin
      const response = await fetch('/api/account/delete', {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error eliminando cuenta')
      }

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error eliminando cuenta'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  useEffect(() => {
    fetchAccountData()

    // Escuchar cambios en autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setAccountData({
            user: null,
            sessions: [],
            connectedAccounts: {
              google: false,
              github: false,
              email: false
            }
          })
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          fetchAccountData()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return {
    accountData,
    loading,
    error,
    updateProfile,
    resetPassword,
    deleteAccount,
    refetch: fetchAccountData
  }
}
