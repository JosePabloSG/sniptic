"use client"

import * as React from "react"
import Image from "next/image"
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

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Prompt Builder",
      url: "#",
      icon: IconWand,
    },
    {
      title: "Refactorización",
      url: "#",
      icon: IconRefresh,
    },
    {
      title: "Clasificación",
      url: "#",
      icon: IconTags,
    },
    {
      title: "Proyectos",
      url: "#",
      icon: IconFolder,
    }
  ],
  navClouds: [
    {
      title: "Prompt Builder",
      icon: IconWand,
      isActive: true,
      url: "#"
    },
    {
      title: "Refactorización",
      icon: IconRefresh,
      url: "#",
    },
    {
      title: "Clasificación",
      icon: IconTags,
      url: "#"
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Ayuda",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
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
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
