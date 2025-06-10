# Sniptic

![Sniptic Logo](public/sniptic.svg)

## 📋 Sobre el Proyecto

Sniptic es una plataforma moderna para la gestión y optimización de snippets de código. Diseñada para desarrolladores y equipos técnicos, Sniptic facilita la clasificación, búsqueda y mejora de fragmentos de código, permitiéndote construir una biblioteca de código reutilizable y compartible.

### Características Principales

- 🧩 **Gestión de Snippets**: Organiza y categoriza tus fragmentos de código
- 🔍 **Búsqueda Avanzada**: Encuentra rápidamente el código que necesitas
- 🛠️ **Refactorización Asistida**: Mejora tu código con sugerencias inteligentes
- 📊 **Dashboard Personalizado**: Visualiza y gestiona tus proyectos
- 🔄 **Prompt Builder**: Crea instrucciones precisas para IA generativa
- 🌐 **Interfaz Moderna**: Diseño intuitivo construido con Next.js y TailwindCSS

## 🚀 Tecnologías Utilizadas

- [Next.js 15](https://nextjs.org/) - Framework React con App Router
- [React 19](https://react.dev/) - Biblioteca JavaScript para interfaces de usuario
- [TailwindCSS 4](https://tailwindcss.com/) - Framework CSS utilitario
- [Radix UI](https://www.radix-ui.com/) - Componentes de UI accesibles
- [Resend](https://resend.com/) - API para envío de emails

## 📥 Instalación y Configuración

### Prerrequisitos

- Node.js 20.x o superior
- npm, yarn, pnpm o bun

### Pasos para Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/sniptic.git
   cd sniptic
   ```

2. **Instalar dependencias**

   ```bash
   # Con npm
   npm install

   # Con yarn
   yarn

   # Con pnpm
   pnpm install

   # Con bun
   bun install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env.local

   # Editar el archivo con tus propias credenciales
   ```

### Variables de Entorno Requeridas

| Variable              | Descripción                                                                        |
| --------------------- | ---------------------------------------------------------------------------------- |
| `RESEND_API_KEY`      | API Key de [Resend](https://resend.com) para enviar emails                         |
| `EMAIL_TO`            | Email donde recibirás los mensajes de contacto                                     |
| `EMAIL_FROM`          | Email y nombre para el remitente (ej: "Contacto Sniptic <contacto@tudominio.com>") |
| `NEXT_PUBLIC_APP_URL` | URL base de tu aplicación (ej: https://tudominio.com)                              |

## 🖥️ Desarrollo Local

1. **Iniciar el servidor de desarrollo**

   ```bash
   # Con npm
   npm run dev

   # Con yarn
   yarn dev

   # Con pnpm
   pnpm dev

   # Con bun
   bun dev
   ```

2. **Acceder a la aplicación**

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

3. **Estructura del Proyecto**

   - `/app`: Rutas y páginas de la aplicación (App Router de Next.js)
   - `/components`: Componentes reutilizables UI/UX
   - `/lib`: Utilidades y configuraciones
   - `/public`: Archivos estáticos (imágenes, fuentes, etc.)

## 🌐 Despliegue en Producción

Este proyecto está optimizado para ser desplegado en [Vercel](https://vercel.com).

### Pasos para Desplegar en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una
2. Importa tu repositorio de GitHub/GitLab/Bitbucket
3. Configura las variables de entorno:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
   - `NEXT_PUBLIC_APP_URL` (usa el dominio asignado por Vercel o tu dominio personalizado)
4. Despliega la aplicación

### Verificación del Dominio en Resend

Para enviar correos desde tu propio dominio:

1. Configura el dominio en [Resend](https://resend.com)
2. Verifica el dominio siguiendo las instrucciones de Resend
3. Actualiza la variable `EMAIL_FROM` con tu dominio verificado

### Monitoreo y Logs

Una vez desplegada la aplicación, puedes monitorear los logs de API desde el dashboard de Vercel para verificar que los correos se estén enviando correctamente.

## 🔧 Solución de Problemas Comunes

- **No se reciben correos**: Verifica que la API key de Resend esté correctamente configurada y que los dominios estén verificados.
- **Errores en el formulario de contacto**: Verifica los logs en Vercel para identificar posibles errores en la API.
- **Problemas con TurboRepo**: Si encuentras errores durante el desarrollo con `--turbopack`, intenta ejecutar `next dev` sin esta opción.

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## 📞 Contacto

Para preguntas o sugerencias, por favor contacta a través del formulario de contacto en la aplicación.
