"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> { }

export function DashboardHeader({ className, ...props }: DashboardHeaderProps) {
  const pathname = usePathname()

  // Divide la ruta en segmentos y filtra las cadenas vacías
  const pathSegments = pathname.split("/").filter(Boolean)

  // Determina el título de la página actual para el último elemento del breadcrumb
  const currentPageTitle =
    pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1]
        .split("-") // Maneja rutas con kebab-case
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ")
      : "Dashboard" // Valor por defecto para la ruta raíz del dashboard

  return (
    <header className={cn("flex h-16 shrink-0 items-center gap-2 border-b px-4", className)} {...props}>
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {/* Muestra "Dashboard" como la raíz solo si no estamos en la página principal del dashboard */}
          {pathSegments.length > 1 && pathSegments[0] === "dashboard" && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}

          {/* Renderiza los segmentos de ruta intermedios como enlaces */}
          {pathSegments.slice(1, -1).map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 2).join("/")}`
            const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
            return (
              <React.Fragment key={segment}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            )
          })}

          {/* Renderiza la página actual como el último elemento del breadcrumb */}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Espacio para contenido adicional en el encabezado, como un menú de usuario o notificaciones */}
      <div className="ml-auto">
        {/* Puedes añadir aquí elementos como un botón de notificaciones o un menú de usuario */}
      </div>
    </header>
  )
}
