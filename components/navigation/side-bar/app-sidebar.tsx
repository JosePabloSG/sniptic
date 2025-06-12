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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const getNavItems = (items: typeof data.navMain) => {
    return items.map(item => ({
      ...item,
      isActive: pathname === item.url
    }))
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
              <a href="/dashboard">
                <Image
                  src="/sniptic.svg"
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
