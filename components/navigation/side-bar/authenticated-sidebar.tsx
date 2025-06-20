"use client"

import { useUser } from "@/hooks/use-user"
import { AppSidebar } from "./app-sidebar"
import { SidebarSkeleton } from "./sidebar-skeleton"

interface AuthenticatedSidebarProps extends React.ComponentProps<typeof AppSidebar> {
  /**
   * Si es true, muestra el skeleton completo del sidebar mientras carga la sesión
   * Si es false, solo muestra skeleton en el componente del usuario
   */
  showFullSkeletonOnLoad?: boolean

  /**
   * Componente a mostrar mientras se carga la sesión (alternativo al skeleton)
   */
  loadingComponent?: React.ReactNode
}

/**
 * Wrapper del AppSidebar que maneja automáticamente los estados de carga de la sesión
 * Puedes usar este componente si quieres un control automático de los skeletons,
 * o usar AppSidebar directamente si prefieres manejar los estados manualmente
 */
export function AuthenticatedSidebar({
  showFullSkeletonOnLoad = false,
  loadingComponent,
  ...props
}: AuthenticatedSidebarProps) {
  const { loading } = useUser()

  // Si hay un componente de carga personalizado
  if (loading && loadingComponent) {
    return <>{loadingComponent}</>
  }

  // Si se quiere mostrar el skeleton completo
  if (loading && showFullSkeletonOnLoad) {
    return <SidebarSkeleton {...props} />
  }

  // Comportamiento normal: AppSidebar maneja su propio skeleton del usuario
  return <AppSidebar {...props} />
}

// Hook personalizado para casos específicos de UI
export function useSidebarLoading() {
  const { user, loading } = useUser()

  return {
    user,
    loading,
    isAuthenticated: !!user && !loading,
    shouldShowSkeleton: loading,
  }
}
