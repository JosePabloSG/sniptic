# Sniptic

Este es un proyecto [Next.js](https://nextjs.org) de Sniptic con funcionalidades de contacto por email.

## Primeros pasos

Primero, configura las variables de entorno:

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local
# Edita el archivo con tus propias credenciales
```

### Variables de entorno requeridas

- `RESEND_API_KEY`: API Key de [Resend](https://resend.com) para enviar emails
- `EMAIL_TO`: Email donde recibirás los mensajes de contacto
- `EMAIL_FROM`: Email y nombre para el remitente (ej: "Contacto Sniptic <contacto@tudominio.com>")
- `NEXT_PUBLIC_APP_URL`: URL base de tu aplicación (ej: https://tudominio.com)

## Desarrollo

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en [Vercel](https://vercel.com).

### Pasos para desplegar en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una
2. Importa tu repositorio de GitHub/GitLab/Bitbucket
3. Configura las siguientes variables de entorno en la configuración del proyecto:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
   - `NEXT_PUBLIC_APP_URL` (usa el dominio asignado por Vercel o tu dominio personalizado)
4. Despliega la aplicación

### Verificación del dominio en Resend

Para enviar correos desde tu propio dominio:

1. Configura el dominio en [Resend](https://resend.com)
2. Verifica el dominio siguiendo las instrucciones de Resend
3. Actualiza la variable `EMAIL_FROM` con tu dominio verificado

### Monitoreo y logs

Una vez desplegada la aplicación, puedes monitorear los logs de API desde el dashboard de Vercel para verificar que los correos se estén enviando correctamente.

## Solución de problemas comunes

- **No se reciben correos**: Verifica que la API key de Resend esté correctamente configurada y que los dominios estén verificados.
- **Errores en el formulario de contacto**: Verifica los logs en Vercel para identificar posibles errores en la API.
