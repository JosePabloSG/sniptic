"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  IconDashboard,
  IconFolder,
  IconHelp,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconTags,
  IconWand,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { useUser } from "@/hooks/use-user"
import { SidebarSkeleton } from "./sidebar-skeleton"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Prompt Builder",
      url: "/dashboard/prompt-builder",
      icon: IconWand,
    },
    {
      title: "Refactorización",
      url: "/dashboard/refactoring",
      icon: IconRefresh,
    },
    {
      title: "Clasificación",
      url: "/dashboard/classification",
      icon: IconTags,
    },
    {
      title: "Proyectos",
      url: "/dashboard/projects",
      icon: IconFolder,
    }
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Ayuda",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "/dashboard/search",
      icon: IconSearch,
    },
  ]
}

export function AppSidebar({
  showFullSkeleton = false,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  showFullSkeleton?: boolean
}) {
  const pathname = usePathname()
  const { user, loading } = useUser()

  const getNavItems = (items: typeof data.navMain) => {
    return items.map(item => ({
      ...item,
      isActive: pathname === item.url
    }))
  }

  // Si se solicita mostrar el skeleton completo y está cargando
  if (showFullSkeleton && loading) {
    return <SidebarSkeleton {...props} />
  }

  // Datos del usuario para el componente NavUser
  const userData = user ? {
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario',
    email: user.email || 'Sin email',
    avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email?.split('@')[0] || 'U')}&background=random`
  } : {
    name: 'Cargando...',
    email: 'Cargando...',
    avatar: ''
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <Image
                  src="/assets/sniptic.svg"
                  alt="Sniptic Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-base font-semibold">Sniptic</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItems(data.navMain)} />
        <NavSecondary items={getNavItems(data.navSecondary)} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} loading={loading} />
      </SidebarFooter>
    </Sidebar>
  )
}
