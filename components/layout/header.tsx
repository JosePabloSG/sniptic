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

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  // Extending HTMLAttributes for header properties
}

export function DashboardHeader({ className, ...props }: DashboardHeaderProps) {
  const pathname = usePathname()

  // Divide la ruta en segmentos y filtra las cadenas vacías
  const pathSegments = pathname.split("/").filter(Boolean)

  // Función para decodificar y formatear un segmento de URL
  const formatSegment = (segment: string) => {
    try {
      // Decodifica la URL para manejar espacios y caracteres especiales
      const decoded = decodeURIComponent(segment)
      // Si el segmento decodificado ya tiene espacios, úsalo tal como está
      if (decoded.includes(" ")) {
        return decoded.charAt(0).toUpperCase() + decoded.slice(1)
      }
      // Si no tiene espacios, procesa kebab-case
      return decoded
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    } catch {
      // Si hay error en la decodificación, usa el formato original
      return segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    }
  }

  // Determina el título de la página actual para el último elemento del breadcrumb
  const currentPageTitle =
    pathSegments.length > 0
      ? formatSegment(pathSegments[pathSegments.length - 1])
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
            const title = formatSegment(segment)
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
