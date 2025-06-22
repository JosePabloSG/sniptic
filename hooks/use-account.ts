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

      // Obtener identidades del usuario para una detección más precisa
      const { data: identities, error: identitiesError } = await supabase.auth.getUserIdentities()

      let connectedAccounts = {
        google: false,
        github: false,
        email: false
      }

      // Si obtenemos las identidades correctamente, usar esa información
      if (!identitiesError && identities?.identities) {
        const providers = identities.identities.map(identity => identity.provider)
        connectedAccounts = {
          google: providers.includes('google'),
          github: providers.includes('github'),
          email: providers.includes('email') // Solo si existe la identidad 'email'
        }
      } else {
        // Fallback a app_metadata si no podemos obtener identities
        const providers = user.app_metadata?.providers || []
        connectedAccounts = {
          google: providers.includes('google'),
          github: providers.includes('github'),
          email: providers.includes('email') // Solo si el provider 'email' está en app_metadata
        }
      }

      console.log('Connected accounts:', connectedAccounts)

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

  const connectProvider = async (provider: 'google' | 'github') => {
    try {
      setError(null)

      const { error } = await supabase.auth.linkIdentity({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard/profile/account`
        }
      })

      if (error) throw error
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Error conectando ${provider}`
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const disconnectProvider = async (provider: 'google' | 'github' | 'email') => {
    try {
      setError(null)

      // Obtener las identidades del usuario
      const { data: identities, error: identitiesError } = await supabase.auth.getUserIdentities()
      if (identitiesError) throw identitiesError

      // Encontrar la identidad del provider específico
      const identity = identities?.identities?.find(id => id.provider === provider)
      if (!identity) {
        throw new Error(`No se encontró la identidad de ${provider}`)
      }

      const { error } = await supabase.auth.unlinkIdentity(identity)
      if (error) throw error

      // Refrescar datos
      await fetchAccountData()
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Error desconectando ${provider}`
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const changeEmail = async (newEmail: string) => {
    try {
      setError(null)

      // Usar nuestra API personalizada para manejar el cambio de email
      const response = await fetch('/api/account/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error cambiando email')
      }

      // No refrescar datos inmediatamente ya que el cambio está pendiente de verificación
      return { success: true, message: data.message }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error cambiando email'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  useEffect(() => {
    fetchAccountData()

    // Escuchar cambios en autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event)
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
          // Pequeño delay para asegurar que los datos estén actualizados
          setTimeout(() => {
            fetchAccountData()
          }, 500)
        }
      }
    )

    // Listener para refrescar cuando el usuario regrese a la pestaña
    const handleFocus = () => {
      console.log('Window focused, refreshing account data')
      fetchAccountData()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return {
    accountData,
    loading,
    error,
    updateProfile,
    resetPassword,
    deleteAccount,
    connectProvider,
    disconnectProvider,
    changeEmail,
    refetch: fetchAccountData,
    forceRefresh: () => {
      console.log('Forcing account data refresh')
      setTimeout(() => fetchAccountData(), 100)
    }
  }
}
