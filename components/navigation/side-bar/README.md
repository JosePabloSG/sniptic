# Sidebar con Skeleton Loaders

Esta implementación incluye skeleton loaders precisos para todos los estados de carga del sidebar mientras se obtienen los datos de la sesión de Supabase.

## Componentes Disponibles

### 1. `AppSidebar` (Componente Principal)

El sidebar principal con skeleton automático solo en el componente del usuario.

```tsx
import { AppSidebar } from "@/components/navigation/side-bar/app-sidebar"

// Uso básico - muestra skeleton solo en el usuario mientras carga
<AppSidebar />

// Con skeleton completo opcional
<AppSidebar showFullSkeleton={true} />
```

### 2. `AuthenticatedSidebar` (Wrapper con Control Avanzado)

Un wrapper que proporciona control completo sobre los estados de carga.

```tsx
import { AuthenticatedSidebar } from "@/components/navigation/side-bar/authenticated-sidebar"

// Skeleton solo en el usuario (comportamiento por defecto)
<AuthenticatedSidebar />

// Skeleton completo del sidebar
<AuthenticatedSidebar showFullSkeletonOnLoad={true} />

// Componente de carga personalizado
<AuthenticatedSidebar
  loadingComponent={<div>Cargando sesión...</div>}
/>
```

### 3. Skeletons Individuales

Para casos de uso específicos:

```tsx
import {
  SidebarSkeleton,
  NavUserSkeleton,
  NavItemSkeleton
} from "@/components/navigation/side-bar/sidebar-skeleton"

// Skeleton completo del sidebar
<SidebarSkeleton />

// Solo skeleton del usuario
<NavUserSkeleton />

// Skeleton de un elemento de navegación
<NavItemSkeleton />
```

### 4. Hook de Estado

Para lógica personalizada:

```tsx
import { useSidebarLoading } from "@/components/navigation/side-bar/authenticated-sidebar";

function MyComponent() {
  const { user, loading, isAuthenticated, shouldShowSkeleton } =
    useSidebarLoading();

  if (shouldShowSkeleton) {
    return <SidebarSkeleton />;
  }

  // Tu lógica personalizada...
}
```

## Características

### ✅ Skeleton Loaders Precisos

- Replican exactamente la estructura visual del componente real
- Usan el componente `Skeleton` de shadcn/ui
- Animaciones suaves y consistentes
- Mismo spacing y dimensiones que los componentes originales

### ✅ Estados de Carga Inteligentes

- Se activan automáticamente mientras se obtienen datos de Supabase
- Se desactivan cuando los datos están listos
- Manejo de errores incluido

### ✅ Flexibilidad de Uso

- Skeleton solo en el usuario (por defecto)
- Skeleton completo del sidebar (opcional)
- Componentes de carga personalizados
- Control manual con hooks

### ✅ Integración con Supabase

- Hook `useUser` que maneja la sesión automáticamente
- Escucha cambios de autenticación en tiempo real
- Datos del usuario extraídos del metadata de Supabase
- Logout funcional integrado

## Datos del Usuario Soportados

El sistema extrae automáticamente:

- **Nombre**: `full_name`, `name` del metadata, o parte local del email
- **Email**: Email de la cuenta de Supabase
- **Avatar**: `avatar_url`, `picture` del metadata, o genera uno automático

## Ejemplo Completo

```tsx
// layout.tsx o tu componente principal
import { AuthenticatedSidebar } from "@/components/navigation/side-bar/authenticated-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* Opción 1: Skeleton solo en usuario */}
      <AuthenticatedSidebar />

      {/* Opción 2: Skeleton completo */}
      <AuthenticatedSidebar showFullSkeletonOnLoad={true} />

      <main className="flex-1">{children}</main>
    </div>
  );
}
```
