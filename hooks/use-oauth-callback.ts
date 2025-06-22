import { useMutation } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface OAuthCallbackData {
  code: string
}

const handleOAuthCallback = async ({ code }: OAuthCallbackData) => {
  console.log('Handling OAuth callback with code:', code)

  const supabase = createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Error exchanging code:', error)
    throw new Error('Error conectando proveedor: ' + error.message)
  }

  console.log('Successfully handled OAuth callback')
  return data
}

export function useOAuthCallback() {
  const router = useRouter()

  return useMutation({
    mutationFn: handleOAuthCallback,
    onSuccess: () => {
      toast.success('Proveedor conectado exitosamente')
      // Limpiar la URL removiendo el código
      router.replace('/dashboard/profile/account')
    },
    onError: (error: Error) => {
      console.error('Unexpected error handling callback:', error)
      toast.error(error.message || 'Error inesperado al conectar proveedor')
      router.replace('/dashboard/profile/account')
    },
  })
}
