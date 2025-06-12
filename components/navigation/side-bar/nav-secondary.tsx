"use client"

import * as React from "react"
import Link from "next/link"
import { IconHome } from "@tabler/icons-react"
type IconType = typeof IconHome

import { cn } from "@/lib/utils"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavSecondaryProps extends React.ComponentProps<typeof SidebarMenu> {
  items: {
    title: string
    url: string
    icon: IconType
    isActive?: boolean
  }[]
}

export function NavSecondary({ items, className, ...props }: NavSecondaryProps) {
  return (
    <SidebarMenu className={cn("py-2", className)} {...props}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className={cn(
                "flex items-center gap-3",
                item.isActive && "text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
