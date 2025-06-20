"use client"

import type React from "react"

import Link from "next/link"
import type { IconHome } from "@tabler/icons-react"
type IconType = typeof IconHome

import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavMainProps extends React.ComponentProps<typeof SidebarMenu> {
  items: {
    title: string
    url: string
    icon: IconType
    isActive?: boolean
  }[]
}

export function NavMain({ items, className, ...props }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className={cn("py-2", className)} {...props}>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className={cn(item.isActive && "text-blue-600 bg-slate-300")}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3" 
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
