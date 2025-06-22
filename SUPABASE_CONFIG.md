# Configuración de Supabase para URLs de redirección

## Para configurar correctamente el cambio de email, necesitas:

### 1. En tu proyecto de Supabase (Dashboard > Authentication > URL Configuration):

Agregar estas URLs a "Redirect URLs":

- `http://localhost:3000/api/auth/callback`
- `https://tu-dominio.com/api/auth/callback`

### 2. En tu proyecto de Supabase (Dashboard > Authentication > Email Templates):

Para el template "Confirm signup":

- Cambiar la URL de redirección a: `{{ .SiteURL }}/api/auth/callback?type=signup`

Para el template "Change Email Address":

- Cambiar la URL de redirección a: `{{ .SiteURL }}/api/auth/callback?type=email_change`

### 3. Variables de entorno necesarias:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# O tu dominio en producción
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Esto asegurará que:

1. El primer email de confirmación de cambio redirija correctamente
2. El segundo email de verificación del nuevo email redirija correctamente
3. Los tipos se pasen correctamente para manejar cada caso
